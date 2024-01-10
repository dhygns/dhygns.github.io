---
layout: default
title:  Vulkan Reinitialization Error
parent: Unity Native Plugin
grand_parent: Dev-Log
nav_order: 1
---

## **ISSUE**

In the Unity 3D Engine, there is an issue with the Native Plugin not reinitializing properly. To elaborate, when the "Play" button is pressed for the first time in the Unity Editor, everything works as expected. However, upon pressing "Play" a second time, textures and various DescriptorSets values are applied with garbage or unexpected values.<br><span style="color:gray"><sup>Unity 3D Engine에서 Native Plugin을 활용할때, 다시 초기화 되지 않는 문제가 있습니다. 좀 더 자세히 말하자면, 
첫 번째로 Unity Editor에서 "Play" 버튼을 눌렀을 때 정상 동작하나, 두 번쨰 "Play" 시에, Texture 및 다양한 DescriptorSets 값들이 쓰레기 값, 혹은 예상하지 못한 값으로 적용되는 이슈가 있었습니다. </sup></span>

This issue was found to be caused by a logic that creates and initializes all Samplers, ImageViews, and Pipelines at the moment UnityPluginLoad is called.<br><span style="color:gray"><sup>확인 결과 위의 원인은, `UnityPluginLoad`가 호출되는 시점에 모든 Sampler, ImageView 및 Pipeline 등을 생성 및 초기화하는 로직을 만들어서 생긴 문제였습니다. </sup></span>

To explain in more detail, in Unity, when the UnityPluginLoad function is called, a function registered to the IUnityGraphics->RegisterDeviceEventCallback method, let's say ProcessDeviceEvent, does not get called when the Unity Editor's "Play" button is pressed for the second time.<br><span style="color:gray"><sup>다시 자세히 적자면, 유니티에서 `UnityPluginLoad` 함수가 호출되는 시점에서, `IUnityGrahpics->RegisterDeviceEventCallback` 메소드에 등록된 함수가 `ProcessDeviceEvent` 라고 할떄, 해당 함수가 Unity Editor의 두 번쨰 "Play" 버튼을 눌렀을 때 호출 되지 않았습니다. </sup></span>


## **KEYWORDS**
`Unity3D` `Reinitialization` `Vulkan API`<br>
`C++` `Unity Native Rendering Plugin`

## **SOLUTION**

1. Perform the following during initialization, which occurs at the first "Play" in the Editor:<br><span style="color:gray"><sup>Initialization 시점에 아래 내용을 수행한다. Editor에서는 최초 Play를 시행한 시점이 된다.</sup></span>
   1. Various Vulkan Buffers<br><span style="color:gray"><sup>각종 Vulkan Buffer</sup></span>
   2. Various Layouts<br><span style="color:gray"><sup>각종 Layout</sup></span>
   3. Various Pipelines<br><span style="color:gray"><sup>각종 Pipeline</sup></span>
   4. Various DescriptorSets<br><span style="color:gray"><sup>각종 DescriptorSets</sup></span>
2. Upon receiving Unity's texture handler, execute the following:<br><span style="color:gray"><sup>Unity의 texture handler를 전달받은 시점에 아래 내용을 수행한다. </sup></span>
   1. Create Sampler and ImageView.<br><span style="color:gray"><sup>Sampler 및 Imageview를 생성한다.</sup></span>
   2. Update WriteDescriptor to point to the latest Sampler and ImageView.<br><span style="color:gray"><sup>WriteDescriptor를 최신 Sampler와 ImageView를 point하도록 수정한다</sup></span>
3. After completing both steps 1 and 2, update the DescriptorSets using `vkUpdateDescriptorSets`.<br><span style="color:gray"><sup>1번과 2번을 모두 수행한 후, DescriptorSets를 `vkUpdateDescriptorSets`를 활용하여 업데이트한다.</sup></span>
