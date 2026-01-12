'use client';

interface ImagePlaceholderProps {
  id: string;
  description: string;
  source: string;
  aspectRatio?: string;
  className?: string;
}

export default function ImagePlaceholder({ 
  id, 
  description, 
  source, 
  aspectRatio = '16:9',
  className = '' 
}: ImagePlaceholderProps) {
  // Calculate padding based on aspect ratio
  const getPaddingBottom = () => {
    const [width, height] = aspectRatio.split(':').map(Number);
    return `${(height / width) * 100}%`;
  };

  // Check if actual image exists
  // Images should be placed in /public/images/ with the placeholder ID as filename
  // e.g., /public/images/IMG-01.png
  const imagePath = `/images/${id}.png`;

  return (
    <div className={`relative w-full ${className}`}>
      <div 
        className="relative w-full overflow-hidden rounded-xl bg-slate-800"
        style={{ paddingBottom: getPaddingBottom() }}
      >
        <img 
          src={imagePath} 
          alt={description}
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>
    </div>
  );
}

// Alternative component that tries to load the image and falls back to placeholder
export function ImageWithFallback({ 
  id, 
  description, 
  source, 
  aspectRatio = '16:9',
  className = '' 
}: ImagePlaceholderProps) {
  const getPaddingBottom = () => {
    const [width, height] = aspectRatio.split(':').map(Number);
    return `${(height / width) * 100}%`;
  };

  const imagePath = `/images/${id}.png`;

  return (
    <div className={`relative w-full ${className}`}>
      <div 
        className="relative w-full overflow-hidden rounded-xl bg-slate-800"
        style={{ paddingBottom: getPaddingBottom() }}
      >
        <img 
          src={imagePath} 
          alt={description}
          className="absolute inset-0 w-full h-full object-contain"
          onError={(e) => {
            // If image fails to load, show placeholder
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = `
                <div class="absolute inset-0 bg-slate-700/50 border-2 border-dashed border-slate-500 flex flex-col items-center justify-center text-center p-4">
                  <div class="bg-slate-800 rounded-lg px-4 py-2 mb-3">
                    <code class="text-blue-400 font-mono text-sm">${id}</code>
                  </div>
                  <p class="text-slate-300 font-medium mb-1">${description}</p>
                  <p class="text-slate-500 text-sm">${source}</p>
                </div>
              `;
            }
          }}
        />
      </div>
    </div>
  );
}
