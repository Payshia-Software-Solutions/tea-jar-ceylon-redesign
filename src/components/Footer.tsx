import { Leaf } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-background/50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Leaf className="h-5 w-5 text-primary" />
            <span className="font-headline text-lg font-bold text-primary">Ceylon Calm</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Ceylon Calm. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
