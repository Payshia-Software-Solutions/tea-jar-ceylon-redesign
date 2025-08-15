
import Image from 'next/image';

interface MintPayProps {
  price: number;
}

export function MintPay({ price }: MintPayProps) {
  const installmentPrice = price / 3;

  return (
    <div className="flex items-center justify-end gap-2 text-xs text-neutral-400 mt-2 w-full">
      <span>or 3 X Rs {installmentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} with</span>
      <Image
        src="https://content-provider.payshia.com/tea-jar/mintpay-pill.png"
        alt="Mintpay"
        width={60}
        height={16}
        className="object-contain"
      />
    </div>
  );
}
