// import GenericAddDiv from '@/components/reusable/GenericAddDiv'
// import GamifyFirst from '@/icons/GamifyFirst'
// import GamifyGoal from '@/icons/GamifyGoal'
// import GamifyMarathon from '@/icons/GamifyMarathon'

// const gamifyGoals = [
//     {
//         id: 1,
//         title: "First Session",
//         points: 10,
//         description: "Completed your first training session",
//         icon: GamifyFirst,
//     },
//     {
//         id: 2,
//         title: "Goal setter",
//         points: 20,
//         description: "Completed training for 3 consecutive days",
//         icon: GamifyGoal,
//     },
//     {
//         id: 3,
//         title: "Consistency Master",
//         points: 50,
//         description: "Finished 10 training sessions",
//         icon: GamifyMarathon,
//     },
//     {
//         id: 4,
//         title: "Marathon trainer",
//         points: 15,
//         description: "Completed a session before 7 AM",
//         icon: GamifyFirst,
//     },
//     {
//         id: 5,
//         title: "Perfect week",
//         points: 15,
//         description: "Completed a session before 7 AM",
//         icon: GamifyGoal,
//     },
//     {
//         id: 6,
//         title: "Goal setter",
//         points: 15,
//         description: "Completed a session before 7 AM",
//         icon: GamifyGoal,
//     },
// ]

// const GamifyManagementContent = () => {
//     return (
//         <div className="flex flex-wrap gap-4">
//             {gamifyGoals.map((goal) => {
//                 const Icon = goal.icon

//                 return (
//                     <div
//                         key={goal.id}
//                         className="bg-secondaryColor p-4 max-w-[263px] rounded-xl w-fit text-whiteColor flex flex-col justify-center items-center space-y-3"
//                     >
//                         <Icon className="w-11 h-11" />

//                         <span className="text-[10px] bg-primaryColor px-3 py-1 rounded-full">
//                             {goal.points} pts
//                         </span>

//                         <h3>{goal.title}</h3>

//                         <p className="text-descriptionColor text-center">
//                             {goal.description}
//                         </p>
//                     </div>
//                 )
//             })}

//             <GenericAddDiv className='max-w-[263px] h-full min-h-[232px]' href='/dashboard/gamify-management/add' />
//         </div>
//     )
// }

// export default GamifyManagementContent


'use client'
import { useEffect, useState } from 'react';
import GenericAddDiv from '@/components/reusable/GenericAddDiv';
import GamifyFirst from '@/icons/GamifyFirst';
import GamifyGoal from '@/icons/GamifyGoal';
import GamifyMarathon from '@/icons/GamifyMarathon';
import { Badge } from '@/types/badge/types';
import { badgeService } from '@/lib/service/badge/badge.service';
import { DEMO_BADGES } from '@/public/demoData/DemoData';



const iconMap = {
    'first_session': GamifyFirst,
    'goal_setter': GamifyGoal,
    'consistency_master': GamifyMarathon,
};

const GamifyManagementContent = () => {
    const [badges, setBadges] = useState<Badge[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchBadges();
    }, []);

    const fetchBadges = async () => {
        try {
            setLoading(true);
            const response = await badgeService.getAll();
            setBadges(response);
        } catch (err) {
            setError('Failed to load badges');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    const displayBadges = error || !badges.length ? DEMO_BADGES : badges;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
            {displayBadges.map((badge) => {

                const IconComponent = iconMap[badge.key as keyof typeof iconMap] || GamifyFirst;

                return (
                    <div
                        key={badge.id}
                        className="bg-secondaryColor p-4 rounded-xl w-full text-whiteColor flex flex-col justify-center items-center space-y-3"
                    >
                        {badge.icon_url ? (
                            <img
                                src={badge.icon_url}
                                alt={badge.title}
                                className="w-11 h-11 object-cover rounded-full"
                            />
                        ) : (
                            <IconComponent className="w-11 h-11" />
                        )}

                        <span className="text-[10px] bg-primaryColor px-3 py-1 rounded-full">
                            {badge.points} pts
                        </span>

                        <h3>{badge.title}</h3>

                        <p className="text-descriptionColor text-center">
                            {badge.description}
                        </p>

                        <span className="text-xs text-gray-400">
                            {badge.users_earned} users earned
                        </span>
                    </div>
                );
            })}

            <GenericAddDiv
                className=' h-full min-h-[232px]'
                href='/dashboard/gamify-management/add'
            />
        </div>
    );
};

export default GamifyManagementContent;