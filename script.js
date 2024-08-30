document.getElementById('imageForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const prompt = document.getElementById('prompt').value;
    const apiKey = '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';
    const imageUpload = document.getElementById('imageUpload').files[0];

    const formData = new FormData();
    formData.append('prompt', prompt);
    formData.append('n', 1);
    formData.append('size', '1024x1024');

    if (imageUpload) {
        const reader = new FileReader();
        reader.onloadend = async function () {
            formData.append('image', reader.result.split(',')[1]); // Append the base64 string of the image
            await generateOrEditImage(apiKey, formData);
        };
        reader.readAsDataURL(imageUpload);
    } else {
        await generateOrEditImage(apiKey, formData);
    }
});

async function generateOrEditImage(apiKey, formData) {
    try {
        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            },
            body: formData
        });

        const data = await response.json();
        const imageUrl = data.data[0].url;

        const imageContainer = document.getElementById('imageContainer');
        imageContainer.innerHTML = `<img src="${imageUrl}" alt="Generated Image">`;

    } catch (error) {
        console.error('Error:', error);
    }
}
