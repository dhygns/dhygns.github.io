<br> 
# Unity Eye Camera
### <br>
-----


if you want to make post proecssing effect in hololens, you should know this information!

<br><br>
#### Camera of Right Eye's world position<br>
```

InputTracking.GetLocalPosition(XRNode.RightEye) // this is definitely world position.

```

<br>
#### Camera of Right Eye's world rotation<br>
```

InputTracking.GetLocalRotation(XRNode.RightEye) // this is definitely world rotation.

```

<br>
#### Camera of Right Eye's world projection matrix<br>
```

Camera.main.GetStereoProjectionMatrix(Camera.StereoscopicEye.Right)

```

<br>
#### so, if you want to make *right eye camera in hololens*. <br>
```

public Camera _RightEyeCamera;
...

_RightEyeCamera.projectionMatrix = Camera.main.GetStereoProjectionMatrix(Camera.StereoscopicEye.Right);
_RightEyeCamera.transform.position = InputTracking.GetLocalPosition(XRNode.RightEye);
_RightEyeCamera.transform.rotation = InputTracking.GetLocalRotation(XRNode.RightEye);

```

<br>
after rendering texture through this, you can render into each eye camera by setting stereo target to `right` / `left`.<br>
In Addition, Hololens's computing power is so weak, before make some post processing, you need to concern about the issue.