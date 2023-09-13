import { testimonials } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function Testimonials() {
    return (
        <div className="py-4 px-6 space-y-10">
            <h1 className="text-5xl text-center font-bold text-white">
                Testimonials
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    testimonials.map((item) => (
                        <Card key={item.name} className="bg-[#192339] border-0 pb-4 text-white">
                            <CardHeader>
                                <CardTitle>
                                    <p className="text-lg ">{item.title}</p>
                                    <p className="text-zinc-400 text-sm">{item.name}</p>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {item.description}
                            </CardContent>
                        </Card>
                    ))
                }
            </div>
        </div>
    )
}
