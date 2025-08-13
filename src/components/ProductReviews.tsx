
'use client';

import { Star, ThumbsUp, ThumbsDown, User } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { Textarea } from './ui/textarea';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { useState } from 'react';

const reviews = [
  {
    id: 1,
    author: 'Samantha D.',
    avatar: '',
    rating: 5,
    title: 'Absolutely wonderful!',
    content: "This is by far the best black tea I've ever had. The aroma is intoxicating and the flavor is so rich and smooth. It's my new morning ritual. Highly recommend!",
    date: '2 weeks ago',
    likes: 12,
    dislikes: 0,
  },
  {
    id: 2,
    author: 'Ben R.',
    avatar: '',
    rating: 4,
    title: 'Very good, but a bit strong for me',
    content: "A high-quality tea, no doubt. The flavor is very robust. I prefer a milder taste, but if you like strong black tea, this is for you. The packaging is also beautiful.",
    date: '1 month ago',
    likes: 8,
    dislikes: 1,
  },
  {
    id: 3,
    author: 'Jessica L.',
    avatar: '',
    rating: 5,
    title: 'A must-have for tea lovers!',
    content: "I'm so glad I discovered this tea. It's become a staple in my pantry. The quality is exceptional, and it's perfect for any time of day. I've already recommended it to all my friends.",
    date: '3 months ago',
    likes: 25,
    dislikes: 0,
  }
];

const ratingDistribution = [
  { rating: 5, percentage: 75, count: 89 },
  { rating: 4, percentage: 15, count: 18 },
  { rating: 3, percentage: 5, count: 6 },
  { rating: 2, percentage: 3, count: 4 },
  { rating: 1, percentage: 2, count: 2 },
];

export function ProductReviews() {
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);

  return (
    <div className="mt-16 md:mt-24">
      <Separator className="my-8 bg-neutral-700" />
      <h2 className="font-headline text-4xl text-center text-white mb-12">Customer Reviews</h2>
      <Card className="bg-[#2a2f28] border-neutral-700 p-6 md:p-8 rounded-xl">
        <CardContent className="p-0">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center">
              <p className="text-sm text-neutral-400">Based on 119 reviews</p>
              <h3 className="text-5xl font-bold text-white mt-2">4.8</h3>
              <div className="flex justify-center items-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-6 h-6 ${i < 5 ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-600'}`} />
                ))}
              </div>
            </div>
            <div className="w-full space-y-2">
              {ratingDistribution.map(item => (
                <div key={item.rating} className="flex items-center gap-4">
                  <span className="text-sm text-neutral-300 flex items-center gap-1">{item.rating} <Star className="w-4 h-4 text-yellow-400" /></span>
                  <Progress value={item.percentage} className="w-full h-2 bg-neutral-700 [&>div]:bg-yellow-400" />
                  <span className="text-sm text-neutral-400 w-8 text-right">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
          
          <Separator className="my-8 bg-neutral-700" />
            <div className="text-center">
                <Button 
                    onClick={() => setIsReviewFormVisible(prev => !prev)}
                    variant="outline"
                    className="bg-transparent text-white border-white hover:bg-white hover:text-black"
                >
                    {isReviewFormVisible ? 'Cancel' : 'Write a review'}
                </Button>
            </div>

          {isReviewFormVisible && (
            <>
            <Separator className="my-8 bg-neutral-700" />
            <div className="space-y-8">
                <h4 className="font-headline text-2xl text-white">Write a review</h4>
                <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <Input placeholder="Name" className="bg-neutral-800 border-neutral-700 text-white" />
                        <Input type="email" placeholder="Email" className="bg-neutral-800 border-neutral-700 text-white" />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-neutral-300">Rating:</span>
                        <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                className={`w-5 h-5 cursor-pointer ${newReviewRating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-500'}`}
                                onClick={() => setNewReviewRating(star)}
                            />
                            ))}
                        </div>
                    </div>
                    <Input placeholder="Review Title" className="bg-neutral-800 border-neutral-700 text-white" />
                    <Textarea placeholder="Body of Review (1500)" rows={4} className="bg-neutral-800 border-neutral-700 text-white" />
                    <div className="flex justify-end gap-4">
                        <Button variant="ghost" onClick={() => setIsReviewFormVisible(false)} className="text-neutral-300 hover:text-white">Cancel</Button>
                        <Button className="bg-white text-black hover:bg-neutral-200">Submit Review</Button>
                    </div>
                </div>
            </div>
            </>
          )}

          <Separator className="my-8 bg-neutral-700" />

          <div className="space-y-8">
            {reviews.map(review => (
              <div key={review.id} className="flex gap-4">
                <Avatar className="h-10 w-10 border border-neutral-700">
                  <AvatarImage src={review.avatar} alt={review.author} />
                  <AvatarFallback className="bg-neutral-700 text-white"><User className="w-5 h-5" /></AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-semibold text-white">{review.author}</h5>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-600'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-neutral-400">{review.date}</p>
                  </div>
                  <h6 className="font-semibold text-neutral-200 mt-3">{review.title}</h6>
                  <p className="text-sm text-neutral-300 mt-1 leading-relaxed">{review.content}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-white hover:bg-neutral-700/50 px-2 py-1 h-auto">
                      <ThumbsUp className="w-4 h-4 mr-2" /> {review.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-white hover:bg-neutral-700/50 px-2 py-1 h-auto">
                      <ThumbsDown className="w-4 h-4 mr-2" /> {review.dislikes}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
