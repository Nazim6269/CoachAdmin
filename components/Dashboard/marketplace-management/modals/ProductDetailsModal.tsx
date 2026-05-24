'use client'

import ModalWrapper from '../../modal/ModalWrapper';
import ModalHeader from '../../modal/ModalHeader';
import ModalBody from '../../modal/ModalBody';
import ModalFooter from '../../modal/ModalFooter';
import Image from 'next/image';
import CustomButton from '@/components/reusable/CustomButton';
import { Product } from '@/types/marketplace/types';

interface Props {
    isOpen: boolean;
    data: Product | null;
    onClose: () => void;
}

export const ProductDetailsModal = ({ isOpen, data, onClose }: Props) => {
    if (!isOpen || !data) return null;

    
    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose}>
            <ModalHeader title="Product Details" />
            <ModalBody>
                <div className="flex flex-col gap-6">
                    {/* Images */}
                    <div className="flex flex-col gap-4">
                        {data.images?.[0] && (
                            <Image
                                src={data.images[0]}
                                alt={data.productName}
                                width={400}
                                height={300}
                                className="rounded-lg object-cover"
                            />
                        )}
                        {data.images && data.images.length > 1 && (
                            <div className="flex gap-2">
                                {data.images.slice(1, 5).map((img, index) => (
                                    <Image
                                        key={index}
                                        src={img}
                                        alt={`${data.productName} ${index + 2}`}
                                        width={80}
                                        height={80}
                                        className="rounded-md object-cover cursor-pointer border border-gray-700"
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col gap-4 text-whiteColor">
                        {/* Title + Status */}
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-semibold">{data.productName}</h2>
                            <span className={`px-2 py-1 text-xs rounded-md ${data.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400' :
                                data.status === 'INACTIVE' ? 'bg-red-500/20 text-red-400' :
                                    'bg-yellow-500/20 text-yellow-400'
                                }`}>
                                {data.status.replace('_', ' ')}
                            </span>
                        </div>

                        {/* Brand */}
                        <div className="text-sm text-gray-300">
                            <span>Brand: {data.brandName}</span>
                        </div>

                        {/* Price & Stock */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-400">Price</p>
                                <p className="text-white font-medium">${data.price}</p>
                                {data.discount > 0 && (
                                    <p className="text-xs text-green-400">{data.discount}% off</p>
                                )}
                            </div>
                            <div>
                                <p className="text-gray-400">Stock</p>
                                <p className="text-white font-medium">{data.stockQuantity} units</p>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <p className="text-gray-400 mb-1">Description</p>
                            <p className="text-sm text-gray-300 leading-relaxed">{data.description}</p>
                        </div>

                        {/* Additional Info */}
                        <div className="text-xs text-gray-400 mt-2">
                            <p>Created: {new Date(data.createdAt).toLocaleDateString()}</p>
                            {data.updatedAt !== data.createdAt && (
                                <p>Updated: {new Date(data.updatedAt).toLocaleDateString()}</p>
                            )}
                        </div>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <CustomButton
                    label="Edit Product"
                    className="bg-blue-500 text-white w-full"
                    onClick={() => console.log('Edit product:', data.id)}
                />
            </ModalFooter>
        </ModalWrapper>
    );
};