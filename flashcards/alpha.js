// script.js
document.addEventListener("DOMContentLoaded", function () {
    const imageContainer = document.getElementById("image-container");

    // Array of image filenames (adjust paths as needed)
    const imageFilenames = [
        "image1.jpg",
        "image2.jpg",
        // ...add all 52 image filenames here
    ];

    // Load images and append them to the container
    imageFilenames.forEach((filename) => {
        const img = document.createElement("img");
        img.src = filename;
        imageContainer.appendChild(img);
    });
});
