
from PIL import Image
import os

input_dir = "." # Relative to where the script is run, which will be src/assets/images
output_dir = "." # Overwrite in place

max_width = 1200
quality = 85

for filename in os.listdir(input_dir):
    if filename.lower().endswith((".png", ".jpg", ".jpeg")):
        filepath = os.path.join(input_dir, filename)
        try:
            with Image.open(filepath) as img:
                # Convert to RGB if not already (important for saving as JPEG)
                if img.mode in ("RGBA", "P"):
                    img = img.convert("RGB")

                # Calculate new dimensions
                width, height = img.size
                if width > max_width:
                    new_height = int((max_width / width) * height)
                    img = img.resize((max_width, new_height), Image.LANCZOS)
                
                # Save optimized image
                output_filepath = os.path.join(output_dir, filename)
                img.save(output_filepath, optimize=True, quality=quality)
                print(f"Optimized {filename}")
        except Exception as e:
            print(f"Error optimizing {filename}: {e}")


