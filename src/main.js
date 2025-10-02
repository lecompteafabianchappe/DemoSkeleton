import{
    bootstrapCameraKit,
    createMediaStreamSource,
    Transform2D,
} from '@snap/camera-kit'

(async function () {
    var cameraKit = await bootstrapCameraKit({apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzU5MzE5ODM0LCJzdWIiOiI3YWIxNWUyYi0xYmZlLTQwYzktYjM0YS0wNjU0MWI3ZWZlNjN-U1RBR0lOR34wZjJkMjA1Ny1lMWQxLTQ4MDUtYjZkNS1lOTU0ZjZlMWQwM2MifQ.VghIbx3sVf_BYLMZcIiUYCaBUHRJUZpSW5BvJXVTYJA' })

    const session = await cameraKit.createSession()
    document.getElementById('canvas').replaceWith(session.output.live)

    const { lenses } = await cameraKit.lensRepository.loadLensGroups([
    'e0cf2360-be99-4dc9-98cc-18d6ef3d523d'
]);

    session.applyLens(lenses[0])
    let mediaSteam = await navigator.mediaDevices.getUserMedia({ video: 
        { facingMode:'environment' }
    });

    const source = createMediaStreamSource(mediaSteam, {
        cameraType:'back'



    })

    await session.setSource(source)
   
    session.source.setRenderSize(window.innerWidth, window.innerHeight)

    session.play()
})();