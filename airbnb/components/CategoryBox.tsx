'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons"
import qs from "query-string";

interface CategoryBoxProps {
    icon: IconType;
    label: string;
    selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
    icon: Icon,
    label,
    selected,
}) => {
    const router = useRouter();
    const params = useSearchParams();

    // it is crucial for the understanding of the following to know that there are two separate entities - the object from the URL and our own updated version of that URL
    const handleClick = useCallback(()=>{
        let currentQuery = {};

        if (params){ //checking if you have the variable you will use a method on, later -> params.toString()
            currentQuery = qs.parse(params.toString()) //object out of all params
        }
        // if one click, category will be added, if it is added, clicking it a second time will remove ti
        const updatedQuery: any = {
            ...currentQuery,
            category: label
        } //when we click ONCE on a category box, its label will be added to the object (updatedQuery) that will form the new query

        // when we click TWICE, we need to remove the category, namely, if params objects is the same as our own created object to be pushed instead, we need to delete it to not have vercel.app/?category=Pools?category=Pools
        if(params?.get('category') === label){ //https://ultimatecourses.com/blog/query-strings-search-params-react-router
            delete updatedQuery.category;
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, {skipNull: true}) //skipNull filters empty options

        router.push(url)
    }, [label, params, router])
    return (
        <div
            onClick={handleClick}
            className={`
                flex 
                flex-col 
                items-center 
                justify-center 
                gap-2
                p-3
                border-b-2
                hover:text-neutral-800
                transition
                cursor-pointer
            ${selected ? 'border-b-neutral-800' : 'border-transparent'} 
            ${selected ? 'text-neutral-800' : 'text-neutral-500'} 

        `}
        >
            <Icon size={26}></Icon>
            <div className="font-medium text-sm">
                {label}
            </div>
        </div>
    )
}

export default CategoryBox
