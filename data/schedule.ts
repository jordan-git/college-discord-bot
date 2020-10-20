import { Lecturer } from './lecturers';

type Day =
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday'
    | 'Sunday';

type Subject = { name: string; moodle?: string; lecturer?: Lecturer };

// TODO: Add lecturer to subjects and embed
const subjects: Subject[] = [
    {
        name: 'Advanced Programming',
        moodle: 'https://mymoodle.ncirl.ie/course/view.php?id=567',
    },
    {
        name: 'Advanced Internet Technologies',
        moodle: 'https://mymoodle.ncirl.ie/course/view.php?id=57',
    },
    {
        name: 'Advanced Databases',
        moodle: 'https://mymoodle.ncirl.ie/course/view.php?id=137',
    },
    {
        name: 'Team Project',
        moodle: 'https://mymoodle.ncirl.ie/course/view.php?id=58',
    },
    {
        name: 'Work Placement',
        moodle: 'https://mymoodle.ncirl.ie/course/view.php?id=440',
    },
    {
        name: 'Wireless Networking',
        moodle: 'https://mymoodle.ncirl.ie/course/view.php?id=568',
    },
    {
        name: 'Data Structures',
    },
];

const subjectMap = new Map<string, Subject>();
for (const subject of subjects) {
    subjectMap.set(subject.name, subject);
}

type DailySchedule = {
    day: Day;
    schedule: { time: string; subject: Subject }[];
};

export const weeklySchedule: DailySchedule[] = [
    {
        day: 'Monday',
        schedule: [
            {
                time: '10:00 - 12:00',
                subject: subjectMap.get('Advanced Internet Technologies'),
            },
            {
                time: '13:00 - 15:00',
                subject: subjectMap.get('Advanced Databases'),
            },
            {
                time: '15:00 - 17:00',
                subject: subjectMap.get('Team Project'),
            },
        ],
    },
    {
        day: 'Tuesday',
        schedule: [
            {
                time: '09:00 - 11:00',
                subject: subjectMap.get('Advanced Programming'),
            },
            {
                time: '14:00 - 16:00',
                subject: subjectMap.get('Team Project'),
            },
            {
                time: '18:00 - 20:00',
                subject: subjectMap.get('Wireless Networking'),
            },
        ],
    },
    {
        day: 'Wednesday',
        schedule: [
            {
                time: '09:00 - 11:00',
                subject: subjectMap.get('Advanced Programming'),
            },
            {
                time: '11:00 - 13:00',
                subject: subjectMap.get('Team Project'),
            },
        ],
    },
    {
        day: 'Thursday',
        schedule: [
            {
                time: '09:00 - 10:00',
                subject: subjectMap.get('Advanced Internet Technologies'),
            },
            {
                time: '10:00 - 12:00',
                subject: subjectMap.get('Work Placement'),
            },
            {
                time: '14:00 - 15:00',
                subject: subjectMap.get('Advanced Databases'),
            },
            {
                time: '15:00 - 17:00',
                subject: subjectMap.get('Data Structures'),
            },
        ],
    },
];
