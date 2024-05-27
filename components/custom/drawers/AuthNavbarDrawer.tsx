import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import {Button} from "@nextui-org/react";
import {CgMenuLeft} from "react-icons/cg";

export default function AuthNavbarDrawer() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant={"light"} isIconOnly={true} size={"sm"} className={"md:hidden text-xl"}>
                    <CgMenuLeft />
                </Button>
            </SheetTrigger>
            <SheetContent side={"right"} className={"auth-w-clamp"}>
                <SheetHeader>
                    <SheetTitle>Edit profile</SheetTitle>
                    <SheetDescription>
                        Make changes to your profile here. Click save when you&apos;re done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span>Rohit</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit">Save changes</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}