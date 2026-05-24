import React, { useState } from 'react'
import ModalWrapper from './ModalWrapper'
import ModalBody from './ModalBody'
import { Loader2 } from 'lucide-react'
import DynamicDropDown from '@/components/reusable/DynamicDropDown'

interface StatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    data?: any;
    menuItems: string[];
    onConfirm: (status: string) => void;
    isPending: boolean;
}

const StatusModal = ({ isOpen, onClose, data, menuItems, onConfirm, isPending }: StatusModalProps) => {
    const [selectedStatus, setSelectedStatus] = useState(data?.status || "");

    const handleSave = async () => {
        if (!data?.id) return;
        onConfirm(selectedStatus);
    };

    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose}>
            <ModalBody>
                <div className="flex flex-col gap-4 p-4">
                    <h2 className="text-xl font-semibold text-whiteColor">Update Status</h2>
                    <div className="flex flex-col gap-6">

                        <DynamicDropDown label={selectedStatus || "Status"} className="w-full bg-gray-100/30 text-whiteColor" menuItems={menuItems} onSelect={(value) => setSelectedStatus(value)} />


                        <div className="flex justify-start gap-3 pt-2">
                            <button
                                onClick={onClose}
                                disabled={isPending}
                                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-all flex items-center gap-2 disabled:bg-neutral-800 disabled:text-gray-500"
                                onClick={handleSave}
                                disabled={isPending || selectedStatus === data?.status}
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    "Save Changes"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </ModalBody>
        </ModalWrapper>
    )
}

export default StatusModal