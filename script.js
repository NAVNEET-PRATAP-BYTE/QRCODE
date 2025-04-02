// Set up size option selection
const sizeOptions = document.querySelectorAll('.size-option');
let selectedSize = 300; // Default size

sizeOptions.forEach(option => {
    option.addEventListener('click', function() {
        // Remove active class from all options
        sizeOptions.forEach(opt => opt.classList.remove('active'));
        // Add active class to selected option
        this.classList.add('active');
        // Update selected size
        selectedSize = parseInt(this.getAttribute('data-size'));
    });
});

function generateQRCode() {
    let text = document.getElementById('text').value;
    let qrCodeDiv = document.getElementById('qrcode');
    qrCodeDiv.innerHTML = "";
    
    if (text.trim() === "") {
        alert("Please enter text or a URL");
        return;
    }
    
    new QRCode(qrCodeDiv, {
        text: text,
        width: selectedSize,
        height: selectedSize,
    });
    
    // Show download button after QR code is generated
    setTimeout(() => {
        document.getElementById('download-btn').style.display = 'inline-block';
    }, 200);
}

function downloadQRCode() {
    // Get the QR code image
    const img = document.querySelector('#qrcode img');
    if (!img) {
        alert("No QR code generated yet!");
        return;
    }
    
    // Add download animation
    const downloadBtn = document.getElementById('download-btn');
    const progressElement = document.createElement('div');
    progressElement.className = 'download-progress';
    downloadBtn.appendChild(progressElement);
    
    // Create a canvas element
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    // Set canvas dimensions to match QR code
    canvas.width = img.width;
    canvas.height = img.height;
    
    // Draw the image onto the canvas
    context.drawImage(img, 0, 0);
    
    // Create a temporary link element
    const downloadLink = document.createElement('a');
    
    // Get the text value for the filename
    const text = document.getElementById('text').value;
    const filename = `qrcode-${text.substring(0, 20).replace(/[^a-z0-9]/gi, '_')}.png`;
    
    // Set download link attributes
    downloadLink.href = canvas.toDataURL('image/png');
    downloadLink.download = filename;
    
    // Wait for animation to complete before download
    setTimeout(() => {
        // Append to body, click, and remove
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        // Remove progress element after download
        setTimeout(() => {
            downloadBtn.removeChild(progressElement);
        }, 500);
    }, 800);
}