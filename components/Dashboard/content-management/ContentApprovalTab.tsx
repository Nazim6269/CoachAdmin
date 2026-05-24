'use client'

import TickIcon from '@/icons/TickIcon';
import { Delete } from 'lucide-react';
import React from 'react';
import Loader from '@/components/reusable/Loader';
import { useBioRequests } from '@/hooks/content-management/useBioRequest';
import { DEMO_BIO_REQUESTS } from '@/public/demoData/DemoData';

const ContentApprovalTab = () => {
    const { requests, loading, error, approveRequest, rejectRequest } = useBioRequests();
    const displayRequests = !loading && (error || !requests.length) ? DEMO_BIO_REQUESTS : requests;

    if (loading) return <Loader />;

    return (
        <div className="space-y-2">
            {displayRequests.map((item) => (
                <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between bg-primaryColor border border-gray-800 rounded-xl p-4 text-gray-200 hover:bg-primaryColor/20 transition gap-3"
                >
                    {/* left */}
                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-1 text-sm font-semibold">
                            <h3 className="text-white">{item.name}</h3>
                            <span className="text-gray-500">:</span>
                            <h3 className="text-white">{item.title}</h3>
                            {item.status && (
                                <span className="ml-2 text-xs px-2 py-0.5 bg-yellow-400/20 text-yellow-400 rounded-full">
                                    {item.status}
                                </span>
                            )}
                        </div>

                        <p className="text-xs text-gray-400 mt-1 break-words">
                            {item.description}
                        </p>
                    </div>

                    {/* right */}
                    <div className="flex gap-2 mt-2 sm:mt-0 flex-shrink-0">
                        <button
                            onClick={() => rejectRequest(item.id)}
                            className="w-8 h-8 flex items-center justify-center border border-gray-700 rounded-md hover:border-red-500 hover:text-red-400 transition"
                        >
                            <Delete className="w-4 h-4" />
                        </button>

                        <button
                            onClick={() => approveRequest(item.id)}
                            className="w-8 h-8 flex items-center justify-center border border-gray-700 rounded-md hover:border-green-500 hover:text-green-400 transition"
                        >
                            <TickIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ContentApprovalTab;