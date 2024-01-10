---
layout: default
title:  How To Connect Console
parent: Unity Native Plugin
grand_parent: Dev-Log
nav_order: 1
---



## **ISSUE**
One of the most challenging aspects of developing a native rendering plugin is dealing with issues that arise and the difficulty in using logs. Especially when handling Graphics APIs separately within a Native Plugin, often things don't work as expected without any messages. To output various values to the Unity Editor, it's necessary to use Unity's Debugging functions, such as Debug.Log, even within the Native Plugin.<br><span style="color:gray"><sup>Native Rendering Plugin을 개발하면서 가장 힘든 점은 아무래도 바로 바로 발생하는 Issue에 대해서 Log를 활용하기 어렵다는 점에 있습니다. 특히 Grahpics API를 별도로 Native Plugin에서 다루다 보면, 어떠한 매세지도 없이 "그냥" 동작하지 않는 경우가 많은데 다양한 값들을 Unity Editor에 출력하기 위해 Native Plugin에서도 Debug.Log와 같은 Unity의 Debugging용 함수를 쓸 수 있어야 했습니다.</sup></span>

Therefore, in this guide, we will share a method to pass a specific function pointer from Unity to the Native Plugin, allowing you to connect and use it. This approach has been confirmed to work on Embedded Linux, Linux, and Windows. If you want to use it on a single platform more simply, it may be possible to implement it more straightforwardly.<br><span style="color:gray"><sup>따라서, 아래와 같은 방법을 사용하여, 유니티의 특정 함수 포인터를 Native Plugin에 전달하여 사용하는 방법을 공유 합니다. 이 방법은 Embedded Linux, Linux, Windows에서 모두 동작하는 것이 확인된 방법입니다. 만일 하나의 플렛폼에서 간단하게 사용하고 싶으신 경우, 더 간단하게 구현이 가능할 수 있습니다.</sup></span>

## **KEYWORDS**
`Unity3D` `Debugging` `Log` `Error` `Message`<br>
`C++` `Unity Native Plugin`

## **SOLUTION**
### **NATIVE PLUGIN (C++) PART**
1. Firstly, in the C++ Native Plugin project, create the following method interface:<br><span style="color:gray"><sup>먼저 C++, Native Plugin 프로젝트에서 아래와 같은 method 인터페이스를 제작합니다.</sup></span>

```c++
#if _WIN32 || _WIN64
#   define DLL_API __declspec(dllexport)
#   define FUNC_PTR _stdcall
#else
#   define DLL_API
#   define FUNC_PTR
#endif

...

static void(FUNC_PTR *g_debugLogFunc)(const char *) = NULL;
extern "C" DLL_API void LinkUnityDebugLog(void(FUNC_PTR *d)(const char *))
{
    g_debugLogFunc = d;
}

extern void InvokeUnityDebugLog(std::string log)
{
    if (g_debugLogFunc)
        g_debugLogFunc(log.c_str());
}

...

```

{:style="counter-reset:step-counter 1"}
2. To view log messages from Unity, use the `InvokeUnityDebugLog` function. However, logs before the initial link won't be displayed, and additional work may be needed to address this.<br><span style="color:gray"><sup>유니티에서 Log message를 확인하기 위해서 `InvokeUnityDebugLog`함수를 사용합니다. 다만, 최초 Link가 되기전 Log들은 출력이 되지 않으며, 이부분을 처리하기 위해서는 별도의 추가 작업이 필요할 수 있습니다.</sup></span>


### **UNITY3D PART**

1. Create an interface to interact with the Native Plugin:<br><span style="color:gray"><sup>Native Plugin과 연동 할 수 있는 인터페이스를 제작합니다.</sup></span>

```c#
using System.Runtime.InteropServices.CallingConvention;
using AOT;
...

[DLLImport("name_of_native_plugin")] 
private static extern void LinkUnityDebugLog([MarshalAs(UnmanagedType.FunctionPtr)] IntPtr debugWrapperPointer);

[UnmanagedFunctionPointer(CallingConvention.StdCall)] 
private delegate void DebugLogWrapper(string log);

[MonoInvokeCallback(typeof(DebugLogWrapper))] 
private static void DebugWrapper(string log) 
{
    Debug.Log("[Native Plugin] : " + log);
}
...

private void Awake() // Or your init method
{
    DebugLogWrapper debugLogWrapper;
    debugLogWrapper = DebugWrapper;
    IntPtr debugWrapperPointer = Marshal.GetFunctionPointerForDelegate(debugLogWrapper);
    LinkUnityDebugLog(debugWrapperPointer);
}

```
