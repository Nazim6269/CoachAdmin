import React, { useState } from 'react'
import ModalWrapper from './ModalWrapper'
import ModalHeader from './ModalHeader'
import ModalBody from './ModalBody';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ModalFooter from './ModalFooter';
import CustomButton from '@/components/reusable/CustomButton';
import { useBulkNotification } from '@/hooks/booking-management/useBulkNotification';
import { useForm } from 'react-hook-form';
import DynamicDropDown from '@/components/reusable/DynamicDropDown';
import { toast } from 'react-toastify';

enum RecipientType {
    ALL = 'all',
    COACHES = 'coaches',
    ATHLETES = 'athletes',
    SPECIFIC = 'specific',
}


interface FormValues {
    notificationTitle: string;
    messageContent: string;
    recipientIds: string;
}

const BulkNotificationModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [recipientType, setRecipientType] = useState<RecipientType>(RecipientType.ALL);
    const { mutateAsync: sendBulkNotification, isPending: isBulkNotificationLoading } = useBulkNotification();

    const { register, handleSubmit, reset } = useForm<FormValues>({
        defaultValues: {
            notificationTitle: "",
            messageContent: "",
            recipientIds: ""
        }
    })

    const onSubmit = async (data: FormValues) => {
        const payload = {
            notification_title: data.notificationTitle,
            message_content: data.messageContent,
            recipient_type: recipientType,
            recipient_ids: recipientType === RecipientType.SPECIFIC && data.recipientIds
                ? data.recipientIds.split(",").map(id => id.trim())
                : []
        };

        try {
            await sendBulkNotification(payload);
            reset();
            setRecipientType(RecipientType.ALL);
            onClose();
        } catch (error) {
            toast.error("Failed to send bulk notification");
        }
    }

    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader title="Send Bulk Notification" className="text-whiteColor border-b border-secondaryColor" />

                <ModalBody className="flex flex-col gap-4 ">
                    <div>
                        <label className="text-gray-400">Notification Title</label>
                        <Input placeholder="Enter your notification title" className='border mt-2 text-whiteColor'  {...register("notificationTitle", { required: true })} />
                    </div>
                    <div>
                        <label className="text-gray-400">Message Content</label>
                        <Textarea placeholder="Write your message here..." className='border mt-2 text-whiteColor' {...register("messageContent", { required: true })} />
                    </div>
                    <div>
                        <label className="text-gray-400 block">Notification Recipients</label>
                        <DynamicDropDown
                            label={recipientType.charAt(0).toUpperCase() + recipientType.slice(1)}
                            onSelect={(val) => setRecipientType(val as RecipientType)}
                            menuItems={Object.values(RecipientType)}
                            className="mt-2 border w-full text-whiteColor bg-blackColor flex justify-between px-4"
                        />
                    </div>
                    {recipientType === RecipientType.SPECIFIC && (
                        <div>
                            <label className="text-gray-400">Recipient IDs (comma separated)</label>
                            <Input placeholder="id1, id2, ..." className='border mt-2 text-whiteColor' {...register("recipientIds")} />
                        </div>
                    )}
                </ModalBody>

                <ModalFooter>
                    <CustomButton
                        type="submit"
                        label={isBulkNotificationLoading ? "Sending..." : "Send Notification"}
                        className='w-full bg-blueColor text-whiteColor hover:bg-blueColor/80'
                        disabled={isBulkNotificationLoading}
                    />
                </ModalFooter>
            </form>
        </ModalWrapper>
    )
}

export default BulkNotificationModal