
'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function AboutPage() {
    useEffect(() => {
        redirect('/tea-jar-story');
    }, []);

    return null;
}
