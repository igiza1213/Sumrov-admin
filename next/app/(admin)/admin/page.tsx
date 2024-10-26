import { Suspense } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Modal from "@/app/modal";
import ListPage, { category } from "@/app/listPage";

export interface saleType {
    Uuid: string;
    CustomerName: string;
    Product: string;
    PostNum: string;
    Addr: string;
    Phone: string;
    Price: string;
    Amount: string;
    Status: string;
    Date: string;
}

const admin = false;

const getData = async () => {
    const urls = [
        "http://3.39.237.151:8080/sale",
        "http://3.39.237.151:8080/post",
        "http://3.39.237.151:8080/notice",
    ];

    const promises = urls.map(
        async (url, i) =>
            await fetch(url, { cache: "no-store" }).then((r) => r.json()),
    );

    try {
        const results: { results: saleType[] }[] = await Promise.all(promises);

        return [
            {
                category: "주문목록",
                detail: true,
                plus: false,
                data: results[0].results.sort(
                    (a, b) => +new Date(b.Date) - +new Date(a.Date),
                ),
            },
            {
                category: "상품관리",
                detail: false,
                plus: true,
                data: results[1].results,
            },
            {
                category: "공지사항",
                detail: false,
                plus: true,
                data: results[2].results,
            },
        ];
    } catch (error) {
        console.error(error);
        return [];
    }
};

export default async function Admin() {
    const categoryList: category[] = await getData();
    return (
        <>
            {admin && <Modal />}

            <main className="h-screen px-[20px] pt-9">
                <nav className="w-full justify-between items-center flex">
                    <div className="gap-4 items-center flex">
                        <img className="w-9 h-9" src="/images/logo.png" />
                        <div className="text-black text-4xl font-semibold">
                            SUMROV
                        </div>
                    </div>
                    <Link
                        href={"/user"}
                        className="text-center text-black text-3xl font-semibold"
                    >
                        회원정보
                    </Link>
                </nav>

                <Suspense fallback={<div>Loading...</div>}>
                    <div className="flex justify-between items-start mt-24">
                        {categoryList.map((args, i) => (
                            <ListPage args={args} i={i} key={i} />
                        ))}
                    </div>
                </Suspense>

                <div className="mt-52 text-center text-black text-5xl font-bold">
                    Design By 정현서
                </div>
            </main>
        </>
    );
}
