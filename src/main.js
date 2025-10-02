import {
    bootstrapCameraKit,
    createMediaStreamSource,
} from '@snap/camera-kit'

(async function () {
    // 🔹 Initialisation avec ton token
    const cameraKit = await bootstrapCameraKit({
        apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzU5MzE5ODM0LCJzdWIiOiI3YWIxNWUyYi0xYmZlLTQwYzktYjM0YS0wNjU0MWI3ZWZlNjN-U1RBR0lOR34wZjJkMjA1Ny1lMWQxLTQ4MDUtYjZkNS1lOTU0ZjZlMWQwM2MifQ.VghIbx3sVf_BYLMZcIiUYCaBUHRJUZpSW5BvJXVTYJA'
    });

    const session = await cameraKit.createSession();
    document.getElementById('canvas').replaceWith(session.output.live);

    // 🔹 Essayer d’obtenir la caméra arrière en priorité
    let mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { exact: 'environment' } }
    }).catch(async () => {
        // fallback si "exact" ne marche pas (certains devices n’ont pas de back cam)
        return await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }
        });
    });

    // 🔹 On crée la source en précisant que c’est bien une backcam
    const source = createMediaStreamSource(mediaStream, {
        cameraType: 'back'
    });

    // 🔹 On set la source AVANT d’appliquer la lens
    await session.setSource(source);

    // 🔹 Chargement de ta lens
    const { lenses } = await cameraKit.lensRepository.loadLensGroups([
        'e0cf2360-be99-4dc9-98cc-18d6ef3d523d'
    ]);

    // 🔹 Application de la lens
    await session.applyLens(lenses[0]);

    // 🔹 Ajuster la taille du rendu
    session.source.setRenderSize(window.innerWidth, window.innerHeight);

    // 🔹 Lancer la session
    session.play();
})();