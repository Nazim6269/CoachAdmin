import React from "react";
import ModalHeader from "./ModalHeader";
import ModalBody from "./ModalBody";
import Image from "next/image";
import ModalWrapper from "./ModalWrapper";
import { Star } from "lucide-react";
import ModalFooter from "./ModalFooter";
import CustomButton from "@/components/reusable/CustomButton";

const ProductDetailsModal = ({
    isOpen,
    onClose,
    data,
}: {
    isOpen: boolean;
    onClose: () => void;
    data: any;
}) => {
    const product = {
        name: data?.product || "John Doe",
        brand: data?.brand || "Swimming · Water aerobics",
        price: data?.price || 4.9,
        stock: data?.stock || 120,
        ratings: data?.ratings || 4.9,
        reviews: data?.reviews || 120,
        sold: data?.sold || 120,
        status: data?.status || "Active",
        description:
            data?.description ||
            "This personalized swimming session is designed to refine stroke technique, improve breathing efficiency, and build endurance in the water. Whether you're preparing for competitions or learning to swim with confidence, the training is tailored to your level and goals.",
        stats: {
            sessions: data?.sessions || "286+",
            experience: data?.experience || "10+",
            languages: data?.languages || "4+",
        },
        image: data?.img || "/productImage.png",
    };

    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose}>
            <ModalHeader title="Product Details" />

            <ModalBody>
                <div className="flex flex-col gap-6">
                    {/* LEFT : Images */}
                    <div className="flex flex-col gap-4">
                        <Image
                            src={product.image}
                            alt="productImage"
                            width={400}
                            height={300}
                            className="rounded-lg object-cover"
                        />

                        <div className="flex gap-2">
                            {[1, 2, 3, 4].map((img) => (
                                <Image
                                    key={img}
                                    src="/productImage.png"
                                    alt="productImage"
                                    width={80}
                                    height={80}
                                    className="rounded-md object-cover cursor-pointer border border-gray-700"
                                />
                            ))}
                        </div>
                    </div>

                    {/* RIGHT : Details */}
                    <div className="flex flex-col gap-4 text-whiteColor">
                        {/* Title + Status */}
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-semibold">{product.name}</h2>

                            <span className="px-2 py-1 text-xs rounded-md bg-green-500/20 text-green-400">
                                {product.status}
                            </span>
                        </div>


                        {/* Ratings */}
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                            <span>{product.brand}</span>
                            <span className="flex items-center gap-1"><Star className="w-4 h-4 text-blue-500 fill-blue-500" /> {product.ratings}</span>

                            <span>{`(${product.sold})`}</span>
                        </div>

                        {/* Description */}
                        <div>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                {product.description}
                            </p>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                            <div>
                                <span>{product.price}</span> <span className="line-through text-gray-600">{product.price}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-1 text-xs rounded-md border border-gray-600 cursor-pointer">-</span>
                                <span className="text-xs">3</span>
                                <span className="px-2 py-1 text-xs rounded-md border border-gray-600 cursor-pointer">+</span>
                            </div>
                        </div>

                    </div>
                </div>
            </ModalBody>

            <ModalFooter>
                <CustomButton label="Edit product" className="bg-blue-500 text-white w-full" />
            </ModalFooter>
        </ModalWrapper>
    );
};

export default ProductDetailsModal;