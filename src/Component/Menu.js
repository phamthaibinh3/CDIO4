import React, { useEffect, useState } from 'react'
import { IoFastFood } from "react-icons/io5";
import { categories } from '../data/data'
import { motion } from 'framer-motion'
import { useStateValue } from '../context/stateprovider';


export default function Menu() {
    const [filter, setFilter] = useState('chicken');
    const [{ foodItems }, dispatch] = useStateValue();
    useEffect(() => { }, [filter])
    return (
        <div>
            <section className='w-full my-3' id="menu">
                <div className="flex flex-col w-full items-center justify-between">
                    <p className="relative text-2xl text-headingColor font-semibold capitalize
          before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto"
                    >
                        Duyệt theo chủ đề
                    </p>
                    <div className='w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none'>

                        {categories && categories.map(category => (
                            <motion.div
                                whileTap={{ scale: 0.7 }}
                                onClick={() => setFilter(category.urlParamName)}
                                key={category.id} className={`group ${filter === category.urlParamName ? 'bg-red-500' : 'bg-card'} w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center duration-150 transition-all ease-in-out hover:bg-red-500`}>
                                <div className={`w-10 h-10 rounded-full ${filter === category.urlParamName ? 'bg-card-500' : 'bg-red'}  group-hover:bg-card flex items-center justify-center`}>
                                    <IoFastFood className={`text-card ${filter === category.urlParamName ? 'bg-card-500' : 'bg-red'} text-textColor`}></IoFastFood>
                                </div>
                                <p className={`text-sm ${filter === category.urlParamName ? 'bg-card-500' : 'bg-red'} text-textColor group-hover:text-card`}> {category.name}</p>
                            </motion.div>

                        ))}
                    </div>
                   
                </div>
            </section>
        </div>
    )
}
