import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

  import { Input } from "@/components/ui/input"

  import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
  
  
export default function Train(){
  return (
    <div className="flex flex-col items-center justify-center h-screen">
    <Card className="w-[20%] flex gap-4">
  <CardHeader className="flex flex-col gap-4">
    <CardTitle>Name: </CardTitle>
    <Input type="email" placeholder="Email" />
    <CardTitle>Type: </CardTitle>
    <Select>
  <SelectTrigger className="w-[260px]">
    <SelectValue placeholder="Type" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="Male">Male</SelectItem>
    <SelectItem value="Female">Female</SelectItem>
    <SelectItem value="Other">Others</SelectItem>
  </SelectContent>
</Select>
    <CardTitle>Age: </CardTitle>
    <Input type="number" placeholder="Age" />
    <CardTitle>Ethinicity: </CardTitle>
    <Select>
  <SelectTrigger className="w-[260px]">
    <SelectValue placeholder="Ethinicity" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="AsianAmerican">AsianAmerican</SelectItem>
    <SelectItem value="EastAsian">EastAsian</SelectItem>
    <SelectItem value="SouthEastAsian">SouthEastAsian</SelectItem>
    <SelectItem value="SouthAsian">SouthAsian </SelectItem>
    <SelectItem value="MiddleEastern">MiddleEastern</SelectItem>
    <SelectItem value="Pacific">Pacific</SelectItem>
    <SelectItem value="Black">Black</SelectItem>
    <SelectItem value="White">White</SelectItem>
    <SelectItem value="Hispanic">Hispanic</SelectItem>
  </SelectContent>
</Select>
<CardTitle>Eye Color: </CardTitle>
<Select>
  <SelectTrigger className="w-[260px]">
    <SelectValue placeholder="Eye color" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="Brown">Brown</SelectItem>
    <SelectItem value="Blue">Blue</SelectItem>
    <SelectItem value="Gray">Gray</SelectItem>
    <SelectItem value="Hazel">Hazel</SelectItem>  
  </SelectContent>
</Select>
<CardTitle>Bald: </CardTitle>
<div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="bald"></Label>
    </div>

   <CardDescription></CardDescription>
  </CardHeader>
  <CardContent>
  </CardContent>
  <CardFooter className="flex gap-15">
  <Button> Cancel</Button>
    <Button> Create Model</Button>
  </CardFooter>
</Card>

</div>
  )
}