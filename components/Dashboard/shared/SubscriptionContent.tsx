'use client'

import React, { useEffect, useState } from 'react'
import SectionWrapper from '@/components/Dashboard/SectionWrapper'
import PricingCard from '@/components/reusable/PricingCard'
import PlusIcon from '@/icons/PlusIcon'
import { useRouter } from 'next/navigation'
import GenericAddDiv from '@/components/reusable/GenericAddDiv'
import { SubscriptionPlan } from '@/types/subscription/types'
import { subscriptionService } from '@/lib/service/subscriptions/subscription.service'
import { DEMO_PLANS } from '@/public/demoData/DemoData'


const SubscriptionContent = () => {
    const router = useRouter()
    const [plans, setPlans] = useState<SubscriptionPlan[]>([])
    const [loading, setLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const data = await subscriptionService.getPlans()
                setPlans(data)
            } catch (error) {
                console.log("failed to fetch plans:", error)
                setHasError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchPlans()
    }, [])
    if (loading) {
        return <SectionWrapper>Loading...</SectionWrapper>
    }

    const displayPlans = hasError || !plans.length ? DEMO_PLANS : plans

    return (
        <SectionWrapper className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full'>
            {displayPlans.map((plan) => (
                <PricingCard
                    key={plan.id}
                    price={Number(plan.price)}
                    period={`per ${plan.interval}`}
                    features={plan.features}
                    onEdit={() => router.push(`/dashboard/subscription-management/edit?id=${plan.id}`)}
                />
            ))}

            <GenericAddDiv className='h-full h-[332px]' href='/dashboard/subscription-management/add' />
        </SectionWrapper>
    )
}

export default SubscriptionContent