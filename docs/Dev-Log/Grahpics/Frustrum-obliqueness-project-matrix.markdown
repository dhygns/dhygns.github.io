---
layout: default
title: Frustrum Obliqueness Project Matrix
parent: Grahpics
grand_parent: Dev-Log
nav_order: 1
---

## **Frustrum Obliqueness Project Matrix** - 사선절두체
When implementing the Physical Camera in another library, which relies on the concept of Frustum Obliqueness, as provided by Unity, you'll need to understand and replicate the frustum obliqueness behavior.<br><span style="color:gray"><sup>Unity에서 제공하는 Physical Camera는 사선절두체, 즉 Frustrum Obliqueness를 사용합니다. Unity에서 제공하는 해당 기능을 다른 Library에서 사용하려고 한다면, 사선 절두체를 학습한 뒤 구현해야 합니다.</sup></span>

To replicate the Physical Camera behavior accurately, you can use the following matrix, assuming the gate-fit setting is set to 'none':<br><span style="color:gray"><sup>Physical Camera를 똑같이 구현하려면 아래와 같은 Matrix를 사용합니다. Gate-fit 설정은 기본으로 none을 사용합니다.</sup></span>

|2 * focal_length / sensor_width|0|2 * lens_shift_x|0|
|0|2 * focal_length / sensor_height|2 * lens_shift_y|0|
|0|0|-(far_clip + near_clip)/(far_clip - near_clip)|-(2 * far_clip * near_clip)/(far_clip - near_clip)|
|0|0|-1|0|

## **KEYWORDS**
`Unity3D` `Project Matrix` `Frustrum Obliqueness` `Physical Camera` `Lens shift`<br>
`Grahpics` `Focal Length` `Sensor Size`
