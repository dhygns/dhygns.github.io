---
layout: default
title:  Unity Native Plugin
parent: Dev-Log
has_children: true
---

# Unity Native Plugin

다양한 Grahpics API를 활용하여 Unity Native Plugin을 만드는 과정에서 발생하는 이슈들을 정리하고 해결방법을 공유합니다. 
이 Plugin은 DirectX11, OpenGL, OpenGLES, Vulkan을 포함하고 있으며 Unity와 직접적으로 연결되는 부분도 다룹니다.

특히, Unity와의 결합하는 특수성으로 인해 많은 Reference가 없는 부분에 대해서도 해결 방법등을 공유합니다.

해당 프로젝트는 Unity로부터 RenderTexture를 받아와 Post effect를 처리하는 과정을 구현하는 가운데 발생하는 이슈들과 Shader 관련한 보편적인 문제들에 대해서 포함 할 수 있습니다.

#### Languages
`C++` `C#` `GLSL for Vulkan` `GLSL` `HLSL`

#### API/SDK/Tools
`D3D11` `OpenGL` `OpenGLES` `Vulkan`

#### Others
`Shell` `CMakeLists.txt`