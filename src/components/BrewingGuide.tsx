'use client';

import { useFormState, useFormStatus } from 'react-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { getBrewingGuide, type BrewingGuideState } from '@/actions/brewing';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Loader2, Thermometer, Clock, Leaf } from 'lucide-react';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface BrewingGuideProps {
  teaType: string;
}

const initialState: BrewingGuideState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg" className="bg-white text-black hover:bg-white/90">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Crafting...
        </>
      ) : (
        'Craft My Guide'
      )}
    </Button>
  );
}

export function BrewingGuide({ teaType }: BrewingGuideProps) {
  const [state, formAction] = useFormState(getBrewingGuide, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.error,
      });
    }
  }, [state.error, toast]);


  return (
    <Card className="bg-[#2a2f28] border-neutral-700/50">
      <CardHeader className="text-center">
        <div className="mx-auto bg-amber-200/10 p-3 rounded-full w-fit mb-4">
            <Leaf className="h-8 w-8 text-amber-200/80" />
        </div>
        <CardTitle className="font-headline text-4xl text-white">Personalized Brewing Guide</CardTitle>
        <CardDescription className="text-lg max-w-2xl mx-auto text-neutral-300">
          Let our AI expert craft the perfect brew for your {teaType} tea. Select your preferences below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!state.guide ? (
          <form action={formAction} className="space-y-8">
            <input type="hidden" name="teaType" value={teaType} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-2xl mx-auto">
              <div className="space-y-2">
                <Label htmlFor="brewing-method" className="text-base font-semibold text-neutral-200">Brewing Method</Label>
                <Select name="brewingMethod" defaultValue="teapot">
                  <SelectTrigger id="brewing-method" className="w-full bg-neutral-800 border-neutral-700 text-white">
                    <SelectValue placeholder="Select a method" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-800 border-neutral-700 text-white">
                    <SelectItem value="teapot">Teapot</SelectItem>
                    <SelectItem value="infuser">Infuser</SelectItem>
                    <SelectItem value="gaiwan">Gaiwan</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-neutral-400">Choose your equipment.</p>
              </div>

              <div className="space-y-2">
                <Label className="text-base font-semibold text-neutral-200">Taste Preference</Label>
                <RadioGroup name="userPreferences" defaultValue="mild" className="flex items-center gap-6 pt-2 h-10">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="strong" id="strong" className="border-neutral-400 text-amber-200" />
                    <Label htmlFor="strong" className="font-normal cursor-pointer text-neutral-300">Strong</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mild" id="mild" className="border-neutral-400 text-amber-200"/>
                    <Label htmlFor="mild" className="font-normal cursor-pointer text-neutral-300">Mild</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sweet" id="sweet" className="border-neutral-400 text-amber-200"/>
                    <Label htmlFor="sweet" className="font-normal cursor-pointer text-neutral-300">Sweet</Label>
                  </div>
                </RadioGroup>
                 <p className="text-sm text-neutral-400">How do you like your tea?</p>
              </div>
            </div>

            <div className="flex justify-center pt-4">
                <SubmitButton />
            </div>
          </form>
        ) : (
          <div className="mt-4">
            <Alert className="bg-neutral-800/50 border-amber-200/20">
              <AlertTitle className="font-headline text-2xl text-amber-200/90 flex items-center gap-2">
                Your Perfect Cup
              </AlertTitle>
              <AlertDescription className="text-base text-neutral-200 space-y-4 pt-4 whitespace-pre-line">
                {state.guide.split('\n').map((line, index) => {
                  if (line.match(/water temperature/i)) {
                    return <p key={index} className="flex items-center gap-2"><Thermometer className="h-5 w-5 text-amber-200/90" /> {line}</p>
                  }
                  if (line.match(/steeping time/i)) {
                    return <p key={index} className="flex items-center gap-2"><Clock className="h-5 w-5 text-amber-200/90" /> {line}</p>
                  }
                  return <p key={index}>{line}</p>
                })}
              </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
      {state.guide && (
        <CardFooter className="flex justify-center">
             <form action={formAction}>
                 <input type="hidden" name="reset" value="true" />
                 <Button variant="link" className="text-amber-200/80">Generate a new guide</Button>
             </form>
        </CardFooter>
      )}
    </Card>
  );
}

    