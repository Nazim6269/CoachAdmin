'use client'

import React from 'react'
import ModalWrapper from './ModalWrapper'
import { AlertCircle } from 'lucide-react'

interface DeleteConfirmModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    isDeleting?: boolean
    title?: string
    message?: string
}

const DeleteConfirmModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    isDeleting = false,
    title = "Delete Confirmation",
    message = "Are you sure you want to delete this user? This action cannot be undone."
}: DeleteConfirmModalProps) => {
    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose} size="sm" showCloseButton={false}>
            <div className="bg-[#1e1e1e] rounded-2xl overflow-hidden text-white p-6">
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                        <AlertCircle className="w-8 h-8 text-red-500" />
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2">{title}</h3>
                    <p className="text-gray-400 text-sm mb-8">{message}</p>
                    
                    <div className="flex items-center gap-3 w-full">
                        <button
                            type="button"
                            disabled={isDeleting}
                            onClick={onClose}
                            className="flex-1 py-2.5 rounded-lg font-medium text-white bg-white/10 hover:bg-white/20 transition disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            disabled={isDeleting}
                            onClick={onConfirm}
                            className="flex-1 py-2.5 rounded-lg font-medium text-white bg-red-600 hover:bg-red-700 transition flex justify-center items-center gap-2 disabled:opacity-50"
                        >
                            {isDeleting ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    Deleting...
                                </>
                            ) : "Delete"}
                        </button>
                    </div>
                </div>
            </div>
        </ModalWrapper>
    )
}

export default DeleteConfirmModal
