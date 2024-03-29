---
layout: default
title:  Unity Vulkan Texture Integration
parent: Unity Native Plugin
grand_parent: Dev-Log
nav_order: 1
---



## **ISSUE**
There was a lack of clear guidance on how to pass a RenderTexture created in Unity3D to a Native Rendering Plugin. Therefore, it was necessary to explore and document precisely how to transfer a RenderTexture and how to use it with the Vulkan API.<br><span style="color:gray"><sup>Unity3D에서 생성된 RenderTexture로 Native Rendering Plugin으로 전달하는 방법에 대한 설명이 부족했습니다. 따라서 다양한 시도를 통해 정확히 Render Texture를 어떻게 전달하는지, 어떻게 Vulkan API에서 사용할 수 있는지 정리가 필요했습니다.</sup></span>

## **KEYWORDS**
`Unity3D` `RenderTexture` `Vulkan API`<br>
`C++` `Unity Native Rendering Plugin`

## **SOLUTION**
### **UNITY3D PART**
1. In Unity3D, first convert the RenderTexture into a Texture. (It needs to be verified whether passing it directly without conversion works properly.) <br><span style="color:gray"><sup>Unity3D에서 먼저 RenderTexture를 Texture로 변환합니다. (그냥 전달하는 경우에도 문제없이 전달되는지는 확인이 필요합니다.)</sup></span>

2. Call the `GetNativeTexturePtr()` method of the Texture to obtain an IntPtr, which is then passed to the Native Plugin. <br><span style="color:gray"><sup>Texture의 method인 GetNativeTexturePtr()을 호출하여 IntPtr의 형태로 Native Plugin에 전달합니다.</sup></span>


```c#
[DllImport("YourLibraryName")]
private static extern void UpdateTextureFromUnity(IntPtr textureHandle);

...

RenderTexture renderTexture = ... ;// Get from camera or create new one
Texture texture = renderTexture;
UpdateTextureFromUnity(texture.GetNativeTexturePtr());
```
The `UpdateTextureFromUnity` function is defined in the native plugin.<br><span style="color:gray"><sup>`UpdateTextureFromUnity` 함수는 native plugin에서 정의됩니다.</sup></span>


### **NATIVE PLUGIN (C++) PART**

1. `UpdateTextureFromUnity` should be defined as follows:<br><span style="color:gray"><sup>아래와 같이 `UpdateTextureFromUnity`가 정의되어 있어야 합니다.</sup></span>

```c++
#if _WIN32 || _WIN64
#define DLL_API __declspec(dllexport)
#else
#define DLL_API
#endif

extern "C" DLL_API void UpdateTextureFromUnity(void *textureHandle);

```

{:style="counter-reset:step-counter 1"}
2. Utilize the IUnityGraphicsVulkan interface provided by Unity. Here, it is referred to as `m_UnityVulkan`. This interface is located in `Unity/IUnityGraphicsVulkan.h`. This file and path are referenced from [Unity-Technologies/NativeRenderingPlugin](https://github.com/Unity-Technologies/NativeRenderingPlugin).<br><span style="color:gray"><sup>유니티에서 제공하는 IUnityGrahpicsVulkan 인터페이스를 사용합니다. 여기서는 m_UnityVulkan이라는 이름으로 사용됩니다. 해당 인터페이스는 Unity/IUnityGrahpicsVulkan.h 에 위치해 있습니다. 이 파일과 경로는 Unity-Technologies/NativeRenderingPlugin을 참고했습니다.</sup></span>
3. Use the `AccessTexture` function provided by this interface. The appropriate parameters for accessing the RenderTexture are as follows. Note that these parameters are for simple usage in a Shader; different values may be required for other operations.<br><span style="color:gray"><sup>이 인터페이스에서 제공하는 AccessTexture 함수를 사용합니다. RenderTexture에 접근하기위해 적절한 Parameter값은 아래와 같이 사용합니다. 단 단순히 RenderTexture를 Shader에서 사용하기 위한 Parameter값으로 그 이외의 작업을 하기 위해서는 다른 값을 사용해야할 수 있습니다.</sup></span>


```c++

DLL_API void UpdateTextureFromUnity(void *textureHandle) 
{

    ...

    // UnityVulkanImage is provided from IUnityGrahpicsVulkan.h
    UnityVulkanImage vulkanImage{}; // MUST BE INITIALIZED!

    if (!m_UnityVulkan->AccessTexture(textureHandle,
        UnityVulkanWholeImage, // This flag should be provided by IUnityGrahpicsVulkan, too.
        VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL,
        VK_PIPELINE_STAGE_FRAGMENT_SHADER_BIT,
        VK_ACCESS_SHADER_READ_BIT,
        kUnityVulkanResourceAccess_PipelineBarrier,
        &vulkanImage))
    {
        // throw exception
    }

...

}

```

{:style="counter-reset:step-counter 3"}
4. Contrary to what the Unity3D documentation suggests, the textureHandle does not return a VkImage*. Instead, it returns a UnityVulkanImage, as shown above. This structure includes various details such as VkImage, VkImageType, VkFormat, VkImageTiling, etc. These fields can be used to appropriately bind to the Descriptor Set and subsequently passed to the Shader.<br><span style="color:gray"><sup>Unity3D document에 따르면, textureHandle은 VkImage *를 반환한다고 되어있으나, 아닙니다. 위와 같이 UnityVulkanImage라는 값으로 반환하며, 위의 과정을 통해서 사용할 수 있습니다. 해당 구조체는 VkImage, VkImageType, VkFormat, VkImageTiling 등 다양한 정보를 포함하고 있습니다. 포함된 필드를 사용해서 적절히 Description Set에 묶을 수 있으며, 이를 통해 Shader에 전달 할 수 있습니다.</sup></span>