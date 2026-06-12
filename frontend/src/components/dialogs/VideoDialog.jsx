import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

// 60-second hospitality / restaurant ambient loop (royalty-free placeholder).
// Replace VIDEO_URL with your own Loom / YouTube / Vimeo embed when ready.
const VIDEO_URL = "https://www.youtube.com/embed/Sklc_fQBmcs?autoplay=1&mute=1&controls=1&rel=0";

export default function VideoDialog({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-testid="video-dialog"
        className="max-w-4xl w-[92vw] p-0 bg-[#0b0b0f] border-white/10 overflow-hidden"
      >
        <VisuallyHidden>
          <DialogTitle>NUA Product Tour</DialogTitle>
          <DialogDescription>A 60-second walkthrough of the NUA platform</DialogDescription>
        </VisuallyHidden>
        <div className="relative aspect-video bg-black">
          {open && (
            <iframe
              data-testid="video-iframe"
              src={VIDEO_URL}
              title="NUA · Product Tour"
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
          <button
            onClick={() => onOpenChange(false)}
            data-testid="video-close-btn"
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 text-white flex items-center justify-center z-10 backdrop-blur"
            aria-label="Close video"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-5 py-3 border-t border-white/5 flex items-center justify-between">
          <div>
            <div className="font-display text-sm font-semibold text-white">NUA · 60-second product tour</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#a1a1aa]">From POS to AI command center</div>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            data-testid="video-done-btn"
            className="px-4 py-2 rounded-full text-xs font-medium bg-[#f58c14] hover:bg-[#d87b10] text-white transition-colors"
          >
            Done
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
