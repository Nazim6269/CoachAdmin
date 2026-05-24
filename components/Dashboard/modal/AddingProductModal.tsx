import React from 'react'
import ModalWrapper from './ModalWrapper'
import ModalHeader from './ModalHeader'
import ModalBody from './ModalBody'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import ModalFooter from './ModalFooter'
import CustomButton from '@/components/reusable/CustomButton'
import { Switch } from '@/components/ui/switch'

const AddingProductModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose}>

            <ModalHeader title="Add New Product" className="text-whiteColor" />

            <ModalBody className="flex flex-col gap-4 ">
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <label htmlFor="" className="text-gray-400">Product Name</label>
                        <Input placeholder="Enter product name" className='border mt-2 h-16 text-whiteColor' />
                    </div>
                    <div>
                        <label htmlFor="" className="text-gray-400">Category</label>
                        <Input placeholder="Enter product brand" className='border mt-2 h-16 text-whiteColor' />
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <label htmlFor="" className="text-gray-400">Price</label>
                        <Input placeholder="Enter price" className='border mt-2 h-16 text-whiteColor' />
                    </div>
                    <div>
                        <label htmlFor="" className="text-gray-400">Stock Quantity</label>
                        <Input placeholder="Enter stock quantity" className='border mt-2 h-16 text-whiteColor' />
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <label htmlFor="" className="text-gray-400">Brand seller</label>
                        <Input placeholder="Enter brand seller" className='border mt-2 h-16 text-whiteColor' />
                    </div>
                    <div>
                        <label htmlFor="" className="text-gray-400">Discount</label>
                        <Input placeholder="Enter discount" className='border mt-2 h-16 text-whiteColor' />
                    </div>
                </div>
                <div>
                    <label htmlFor="" className="text-gray-400">Description</label>
                    <Textarea placeholder="Enter description" className='border mt-2 text-whiteColor' rows={9} />
                </div>

                <div className='flex items-center gap-2'>
                    <Switch /> <div className='text-white'>active (visible to customer)</div>
                </div>

            </ModalBody>

            <ModalFooter>
                <CustomButton label="Add Product" className='w-full bg-blueColor text-whiteColor hover:bg-blueColor/80' />
            </ModalFooter>

        </ModalWrapper>
    )
}

export default AddingProductModal