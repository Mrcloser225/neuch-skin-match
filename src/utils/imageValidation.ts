
export interface ImageValidationResult {
  isValid: boolean;
  message: string;
  recommendations?: string[];
}

export const validateImageForSkinAnalysis = async (file: File): Promise<ImageValidationResult> => {
  // Check file type
  if (!file.type.startsWith('image/')) {
    return {
      isValid: false,
      message: "Please upload an image file",
      recommendations: [
        "Use JPEG, PNG, or WebP format",
        "Make sure the file is an actual image"
      ]
    };
  }

  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return {
      isValid: false,
      message: "Image file is too large",
      recommendations: [
        "Use an image smaller than 10MB",
        "Compress the image if needed"
      ]
    };
  }

  // Create image element to analyze
  const img = new Image();
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    return {
      isValid: false,
      message: "Unable to process image",
      recommendations: ["Try a different image format"]
    };
  }

  return new Promise((resolve) => {
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Get image dimensions
      const { width, height } = img;
      
      // Check minimum resolution
      if (width < 200 || height < 200) {
        resolve({
          isValid: false,
          message: "Image resolution is too low",
          recommendations: [
            "Use an image at least 200x200 pixels",
            "Take a new photo with better quality"
          ]
        });
        return;
      }

      // Analyze image brightness and contrast
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      
      let totalBrightness = 0;
      let totalPixels = 0;
      let darkPixels = 0;
      let brightPixels = 0;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // Calculate brightness using luminance formula
        const brightness = (0.299 * r + 0.587 * g + 0.114 * b);
        totalBrightness += brightness;
        totalPixels++;
        
        if (brightness < 50) darkPixels++;
        if (brightness > 200) brightPixels++;
      }

      const avgBrightness = totalBrightness / totalPixels;
      const darkRatio = darkPixels / totalPixels;
      const brightRatio = brightPixels / totalPixels;

      // Check if image is too dark
      if (avgBrightness < 80 || darkRatio > 0.7) {
        resolve({
          isValid: false,
          message: "Image is too dark for accurate skin analysis",
          recommendations: [
            "Take photo in good natural lighting",
            "Avoid shadows on your face",
            "Face a window or go outside for better light"
          ]
        });
        return;
      }

      // Check if image is too bright/overexposed
      if (avgBrightness > 200 || brightRatio > 0.5) {
        resolve({
          isValid: false,
          message: "Image is too bright or overexposed",
          recommendations: [
            "Avoid direct sunlight or harsh lighting",
            "Step away from bright lights",
            "Use softer, diffused lighting"
          ]
        });
        return;
      }

      // Simple face detection heuristic based on skin color ranges
      let skinColorPixels = 0;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // Basic skin color detection (simplified)
        if (r > 95 && g > 40 && b > 20 && 
            r > g && r > b && 
            Math.abs(r - g) > 15) {
          skinColorPixels++;
        }
      }

      const skinRatio = skinColorPixels / totalPixels;
      
      // Check if there's enough skin-like content
      if (skinRatio < 0.1) {
        resolve({
          isValid: false,
          message: "This doesn't appear to be a suitable selfie for skin analysis",
          recommendations: [
            "Take a clear selfie showing your face",
            "Ensure your face takes up a good portion of the image",
            "Remove any makeup for more accurate results",
            "Make sure the image shows skin clearly"
          ]
        });
        return;
      }

      // Image passes all checks
      resolve({
        isValid: true,
        message: "Image is suitable for skin analysis"
      });
    };

    img.onerror = () => {
      resolve({
        isValid: false,
        message: "Unable to load image",
        recommendations: [
          "Make sure the file is a valid image",
          "Try a different image format (JPEG, PNG)"
        ]
      });
    };

    img.src = URL.createObjectURL(file);
  });
};
