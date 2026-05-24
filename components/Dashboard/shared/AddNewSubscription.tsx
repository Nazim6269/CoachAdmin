'use client'
import { useState } from 'react'
import SectionWrapper from '@/components/Dashboard/SectionWrapper'
import FormField from '@/components/reusable/FormField'
import TagInput from '@/components/reusable/TagInput'
import FormToggle from '@/components/reusable/FormToggle'
import CustomButton from '@/components/reusable/CustomButton'
import FormDropdown from '@/components/reusable/FormDropDown'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'
import { subscriptionService } from '@/lib/service/subscriptions/subscription.service'
import ReusableInput from '@/components/reusable/InputFiled/ReusableInput'
import { Textarea } from '@/components/ui/textarea'


const AddNewSubscription = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [features, setFeatures] = useState<string[]>([])
    const [active, setActive] = useState(true)

    const handleSubmit = async () => {
        if (!name || !price || features.length === 0) {
            toast.error("Please fill all fields")
            return
        }


        setLoading(true);

        try {
            const payload = {
                name: name,
                price: price.replace("$", ""),
                currency: "USD",
                interval: 'month',
                features: features,
                description: `${name} subscription plan`,
                is_active: active,
                kind: name.includes('Coach') ? "COACH" : "ATHLETE"
            }
            await subscriptionService.createPlan(payload)
            toast.success("Subscription Created Successfully")
            router.push("/dashboard/subscription-management")
        } catch (error: any) {
            toast.error(error?.message || "Failed to Create Subscription")
        } finally {
            setLoading(false)
        }
    }

    return (
        <SectionWrapper className="flex flex-col gap-6 bg-primaryColor p-4 rounded-xl">
            <div className="flex flex-col gap-4">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-white/60 hover:text-white transition-colors w-fit"
                >
                    <ArrowLeft size={20} />
                    <span className="text-sm font-medium">Back</span>
                </button>
                <div>
                    <h2 className="text-xl font-semibold text-white">Add New Subscription</h2>
                    <hr className="mt-3 border-t border-white/10" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField label='Name'>
                    <ReusableInput
                        placeholder="Enter Plan Name"
                        value={name}
                        className='bg-secondaryColor'
                    />
                </FormField>
                <FormField label='Interval'>
                    <ReusableInput
                        placeholder="Enter Interval"
                        value={name}
                        className='bg-secondaryColor'
                    />
                </FormField>
                <FormField label="Plan">
                    <FormDropdown
                        label="Select Plan"
                        options={['Coach', 'Athlete']}
                        value={name}
                        onChange={setName}
                    />
                </FormField>

                <FormField label="Price">
                    <FormDropdown
                        label="Enter your price"
                        options={['$9.99', '$49']}
                        value={price}
                        onChange={setPrice}
                    />
                </FormField>
            </div>

            <FormField label="Features">
                <TagInput placeholder='Add Features' value={features} onChange={setFeatures} />
            </FormField>
            <FormField label='Description'>
                <Textarea
                    placeholder="Enter Plan Name"
                    value={name}
                    className='bg-secondaryColor'
                />
            </FormField>

            <FormToggle
                label="Active (visible to customers)"
                checked={active}
                onChange={setActive}
            />

            <div>
                <CustomButton
                    label={loading ? "Creating..." : "Add New Subscription"}
                    onClick={handleSubmit}
                    className="bg-blueColor text-white hover:bg-blueColor/80"

                />
            </div>
        </SectionWrapper>
    )
}

export default AddNewSubscription