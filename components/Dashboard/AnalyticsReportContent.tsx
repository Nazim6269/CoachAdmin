'use client'

import StatCards from '@/components/Dashboard/StateCards'
import SingleUserIcon from '@/icons/SingleUserIcon';
import ContentIcon from '@/icons/ContentIcon';
import DollarIcon from '@/icons/DollarIcon';
import StatUpIcon from '@/icons/StatUpIcon';
import StatDownIcon from '@/icons/StatDownIcon';
import CustomButton from '@/components/reusable/CustomButton';
import SectionWrapper from '@/components/Dashboard/SectionWrapper';
import ReveneuAnalytics from '@/components/Dashboard/shared/ReveneuAnalytics';
import DynamicDropDown from '@/components/reusable/DynamicDropDown';
import DownloadIcon from '@/icons/DownloadIcon';
import { useAnalyticsOverview } from '@/hooks/analytics-reports/useAnalyticsOverview';
import { useDownloadPdf } from '@/hooks/analytics-reports/useDownloadPdf';
import { reportsApi } from '@/service/analytics-reports/reportService';
import { buildReportFileName } from '@/utils/download';
import { useState } from 'react';
import { DEMO_ANALYTICS_OVERVIEW } from '@/public/demoData/DemoData';

const AnalyticsContent = () => {
    const [period, setPeriod] = useState("last 6 months");
    const { data, isLoading, isError } = useAnalyticsOverview();
    const overviewData = !isLoading && (isError || !data?.data) ? DEMO_ANALYTICS_OVERVIEW : data;

    const userActivityReport = useDownloadPdf({
        fetcher: () => reportsApi.downloadActivityReport(period),
        filename: buildReportFileName("user-activity-report"),
        mutationOptions: {
            onError: (err) => console.error("Download failed:", err.message),
        },
    });

    const revenueReport = useDownloadPdf({
        fetcher: () => reportsApi.downloadRevenueReport("last 6 months"),
        filename: buildReportFileName("revenue-report"),
        mutationOptions: {
            onError: (err) => console.error("Download failed:", err.message),
        },
    });

    const sessionStatisticsReport = useDownloadPdf({
        fetcher: () => reportsApi.downloadSessionsReport("last 6 months"),
        filename: buildReportFileName("session-statistics-report"),
        mutationOptions: {
            onError: (err) => console.error("Download failed:", err.message),
        },
    });

    const coachPerformanceReport = useDownloadPdf({
        fetcher: () => reportsApi.downloadCoachPerformanceReport("last 6 months"),
        filename: buildReportFileName("coach-performance-report"),
        mutationOptions: {
            onError: (err) => console.error("Download failed:", err.message),
        },
    });

    const analyticsReport = useDownloadPdf({
        fetcher: () => reportsApi.downloadAnalyticsReport("last 6 months"),
        filename: buildReportFileName("analytics-report"),
        mutationOptions: {
            onError: (err) => console.error("Download failed:", err.message),
        },
    });

    const reports = [
        { name: "UserActivity Reports", hook: userActivityReport },
        { name: "Revenue Reports", hook: revenueReport },
        { name: "Session Statistics", hook: sessionStatisticsReport },
        { name: "Coach Performance Reports", hook: coachPerformanceReport },
        { name: "Analytics Reports", hook: analyticsReport },
    ];

    // ─── Stat cards ───────────────────────────────────────────────────────────
    const showDemo = !isLoading && (isError || !data?.data);
    const statCards = [
        { icon: <DollarIcon />, title: "Total Revenue", value: overviewData?.data?.totalRevenue },
        { icon: <SingleUserIcon />, title: "User Growth", value: overviewData?.data?.userGrowth },
        { icon: <ContentIcon />, title: "Session Volume", value: overviewData?.data?.sessionVolume },
        { icon: <StatUpIcon />, title: "Completed", value: overviewData?.data?.completed },
        { icon: <StatDownIcon />, title: "Cancelled", value: overviewData?.data?.cancelled },
    ];

    return (
        <div className="flex flex-col h-full">
            <div>
                <StatCards statCards={statCards} isLoading={isLoading && !showDemo} isError={isError && !showDemo} />
            </div>

            <SectionWrapper>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h2 className='text-xl font-bold text-whiteColor'>Revenue Analytics</h2>
                    <div className="flex md:flex-row flex-col justify-start md:justify-between items-center gap-2">
                        <CustomButton label="Last 12 Months" className='bg-secondaryColor w-full md:w-fit text-whiteColor border' />
                        <CustomButton label="Generate Custom Report" className='bg-blueColor w-full md:w-fit text-whiteColor' />
                    </div>
                </div>
            </SectionWrapper>

            <ReveneuAnalytics />

            <SectionWrapper>
                <h2 className='text-xl font-bold text-whiteColor mb-8'>Export Report</h2>

                <div className="space-y-2 bg-primaryColor p-4 rounded-xl">
                    <div className='flex flex-wrap items-center gap-2 justify-between'>
                        <h3 className='text-whiteColor'>Available Reports</h3>
                        <DynamicDropDown
                            label={period}
                            onSelect={(value) => {
                                setPeriod(value.toLowerCase());
                            }}
                            menuItems={["Last 6 Months", "Last 12 Months", "Last 18 Months"]}
                            className='border bg-secondaryColor text-whiteColor hover:bg-secondaryColor/20 transition hover:text-whiteColor'
                        />
                    </div>

                    <div className="h-[1px] bg-gray-700 my-4" />

                    {reports.map((report, idx) => (
                        <div key={idx} className="flex items-center gap-2 justify-between">
                            <h3 className='text-whiteColor text-sm py-3'>
                                {report.name}
                            </h3>

                            <button
                                onClick={() => report.hook.download()}
                                disabled={report.hook.isPending}
                                className="disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label={`Download ${report.name}`}
                            >
                                <DownloadIcon className={`
                                    w-9 h-9 border border-secondaryColor bg-primaryColor
                                    rounded-md p-2 text-whiteColor transition
                                    ${report.hook.isPending
                                        ? 'animate-pulse cursor-not-allowed'
                                        : 'hover:bg-secondaryColor hover:text-whiteColor'
                                    }
                                `} />
                            </button>
                        </div>
                    ))}
                </div>
            </SectionWrapper>
        </div>
    );
};

export default AnalyticsContent;
