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
import { useToast } from './ui/use-toast';
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
    <Button type="submit" disabled={pending} size="lg">
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
    <Card className="bg-primary/5 border-primary/10">
      <CardHeader className="text-center">
        <div className="mx-auto bg-accent/20 p-3 rounded-full w-fit mb-4">
            <Leaf className="h-8 w-8 text-accent-foreground" />
        </div>
        <CardTitle className="font-headline text-4xl text-primary">Personalized Brewing Guide</CardTitle>
        <CardDescription className="text-lg max-w-2xl mx-auto">
          Let our AI expert craft the perfect brew for your {teaType} tea. Select your preferences below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!state.guide ? (
          <form action={formAction} className="space-y-8">
            <input type="hidden" name="teaType" value={teaType} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-2xl mx-auto">
              <div className="space-y-2">
                <Label htmlFor="brewing-method" className="text-base font-semibold">Brewing Method</Label>
                <Select name="brewingMethod" defaultValue="teapot">
                  <SelectTrigger id="brewing-method" className="w-full">
                    <SelectValue placeholder="Select a method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="teapot">Teapot</SelectItem>
                    <SelectItem value="infuser">Infuser</SelectItem>
                    <SelectItem value="gaiwan">Gaiwan</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">Choose your equipment.</p>
              </div>

              <div className="space-y-2">
                <Label className="text-base font-semibold">Taste Preference</Label>
                <RadioGroup name="userPreferences" defaultValue="mild" className="flex items-center gap-6 pt-2 h-10">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="strong" id="strong" />
                    <Label htmlFor="strong" className="font-normal cursor-pointer">Strong</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mild" id="mild" />
                    <Label htmlFor="mild" className="font-normal cursor-pointer">Mild</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sweet" id="sweet" />
                    <Label htmlFor="sweet" className="font-normal cursor-pointer">Sweet</Label>
                  </div>
                </RadioGroup>
                 <p className="text-sm text-muted-foreground">How do you like your tea?</p>
              </div>
            </div>

            <div className="flex justify-center pt-4">
                <SubmitButton />
            </div>
          </form>
        ) : (
          <div className="mt-4">
            <Alert className="bg-background border-primary/20">
              <AlertTitle className="font-headline text-2xl text-primary flex items-center gap-2">
                Your Perfect Cup
              </AlertTitle>
              <AlertDescription className="text-base text-foreground/90 space-y-4 pt-4 whitespace-pre-line">
                {state.guide.split('\n').map((line, index) => {
                  if (line.match(/water temperature/i)) {
                    return <p key={index} className="flex items-center gap-2"><Thermometer className="h-5 w-5 text-primary" /> {line}</p>
                  }
                  if (line.match(/steeping time/i)) {
                    return <p key={index} className="flex items-center gap-2"><Clock className="h-5 w-5 text-primary" /> {line}</p>
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
                 <Button variant="link">Generate a new guide</Button>
             </form>
        </CardFooter>
      )}
    </Card>
  );
}
