'use client'

import React from 'react'
import { Button } from '../../ui/button'
import SectionWrapper from '../SectionWrapper'
import CoachProfileTab from './CoachProfileTab'
import useTabsQueryState from '@/hooks/common/useTabsQueryState'
import ContentApprovalTab from './ContentApprovalTab'
import SessionValidationTab from './SessionValidationTab'

type TabKey = 'coachProfile' | 'sessionValidation' | 'contentApproval'

interface TabItem<T extends string> {
    key: T
    title: string
}


const tabsArray: TabItem<TabKey>[] = [
    { key: 'coachProfile', title: 'Coach Profile' },
    { key: 'sessionValidation', title: 'Session Validation' },
    { key: 'contentApproval', title: 'Content Approval' },
]

const ContentManagementContent = () => {
    const [activeTab, setActiveTab] = useTabsQueryState<TabKey>('tab', 'coachProfile')
    return (
        <div>

            {/* topbar */}
            <SectionWrapper>
                <div className={`flex gap-2 overflow-x-auto w-full sm:w-fit rounded-lg bg-primaryColor p-3`}>
                    {tabsArray.map((tab) => (
                        <Button key={tab.key} className={`bg-secondaryColor ${activeTab === tab.key ? 'bg-primaryColor' : ''}`} onClick={() => setActiveTab(tab.key)}>
                            {tab.title}
                        </Button>
                    ))}
                </div>
            </SectionWrapper>

            {/* content */}
            <SectionWrapper>
                {activeTab === 'coachProfile' && <CoachProfileTab />}
                {activeTab === 'sessionValidation' && <SessionValidationTab />}
                {activeTab === 'contentApproval' && <ContentApprovalTab />}
            </SectionWrapper>


        </div>
    )
}

export default ContentManagementContent