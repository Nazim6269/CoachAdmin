'use client'
import { useEffect, useState } from 'react'
import SectionWrapper from '@/components/Dashboard/SectionWrapper'
import FormField from '@/components/reusable/FormField'
import TagInput from '@/components/reusable/TagInput'
import FormToggle from '@/components/reusable/FormToggle'
import CustomButton from '@/components/reusable/CustomButton'
import FormDropdown from '@/components/reusable/FormDropDown'
import { toast } from 'sonner'
import { useRouter, useSearchParams } from 'next/navigation'
import { subscriptionService } from '@/lib/service/subscriptions/subscription.service'

const EditSubscription = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [features, setFeatures] = useState<string[]>([])
    const [active, setActive] = useState(true)
    const [kind, setKind] = useState('')
    const [interval, setInterval] = useState('month') // Add this

    useEffect(() => {
        if (!id) {
            toast.error("No Subscription ID Found")
            router.push('/dashboard/subscription-management')
            return;
        }

        const fetchPlan = async () => {
            try {
                const allPlans = await subscriptionService.getPlans()
                const plan = allPlans.find(p => p.id === id)
                
                if (!plan) {
                    toast.error("Plan not found")
                    router.push('/dashboard/subscription-management')
                    return
                }
                
                setName(plan.name)
                setPrice(plan.price)
                setFeatures(plan.features)
                setActive(plan.is_active === 1)
                setKind(plan.kind || '')
                setInterval(plan.interval || 'month')
            } catch (error: any) {
                console.error('Error fetching plans:', error);
                toast.error(error?.message || "Failed to fetch plans")
            } finally {
                setFetching(false)
            }
        }

        fetchPlan()
    }, [id, router])

    const handleSubmit = async () => {
        if (!name || !price || features.length === 0) {
            toast.error("Please fill all fields")
            return
        }

        setLoading(true)
        try {
            // Include ALL required fields that the backend expects
            const payload = {
                name: name,
                price: price,
                currency: 'USD', // Required field
                interval: interval, // Required field
                features: features,
                description: `${name} subscription plan`,
                is_active: active,
                kind: kind
            }

            const result = await subscriptionService.updatePlan(id!, payload)
            
            // Check if a new plan was created instead of updated
            if (result.id !== id) {
                toast.warning("Plan was recreated with new ID", {
                    description: `Old plan deleted, new plan created`
                })
            } else {
                toast.success("Plan updated successfully")
            }
            
            router.push('/dashboard/subscription-management')
        } catch (error: any) {
            console.error('Error updating plan:', error);
            toast.error(error?.response?.data?.message || error?.message || "Failed to update")
        } finally {
            setLoading(false)
        }
    }

    if (fetching) {
        return (
            <SectionWrapper className="flex flex-col gap-6 bg-primaryColor p-4 rounded-xl">
                <div className="text-white">Loading plan data...</div>
            </SectionWrapper>
        )
    }

    return (
        <SectionWrapper className="flex flex-col gap-6 bg-primaryColor p-4 rounded-xl">
            <div>
                <h2 className="text-xl font-semibold text-white">Edit Subscription</h2>
                <hr className="mt-3 border-t border-white/10" />
            </div>

            <div className="flex gap-4">
                <FormField label="Plan Name">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full flex items-center justify-between px-4 py-4 rounded-lg border border-white/20 bg-transparent text-white/50 text-sm hover:border-white/40 transition"
                        placeholder="Enter plan name"
                    />
                </FormField>

                <FormField label="Price">
                    <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full flex items-center justify-between px-4 py-4 rounded-lg border border-white/20 bg-transparent text-white/50 text-sm hover:border-white/40 transition"
                        placeholder="Enter price"
                    />
                </FormField>
            </div>

            <FormField label="Interval">
                <FormDropdown
                    label="Select Interval"
                    options={['month', 'year', 'week']}
                    value={interval}
                    onChange={setInterval}
                />
            </FormField>

            <FormField label="Features">
                <TagInput
                    placeholder="Add features and press Enter"
                    value={features}
                    onChange={setFeatures}
                />
            </FormField>

            <FormField label="Plan Type">
                <FormDropdown
                    label="Select Plan Type"
                    options={['COACH', 'ATHLETE']}
                    value={kind}
                    onChange={setKind}
                />
            </FormField>

            <FormToggle
                label="Active (visible to customers)"
                checked={active}
                onChange={setActive}
            />

            <div>
                <CustomButton
                    label={loading ? "Updating..." : "Update Subscription"}
                    onClick={handleSubmit}
                    className="bg-blueColor text-white hover:bg-blueColor/80"
                />
            </div>
        </SectionWrapper>
    )
}

export default EditSubscription