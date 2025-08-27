import type { Transaction, Budget, Bill, Post, Thread } from './types';

export const transactions: Transaction[] = [
  { id: '1', description: 'Monthly Allowance', amount: 50000, date: '2023-10-01', type: 'income' },
  { id: '2', description: 'Groceries from Shoprite', amount: 7500, date: '2023-10-05', type: 'expense' },
  { id: '3', description: 'Data Subscription (MTN)', amount: 3000, date: '2023-10-06', type: 'expense' },
  { id: '4', description: 'Textbook Purchase', amount: 5000, date: '2023-10-10', type: 'expense' },
  { id: '5', description: 'Bolt Ride to Campus', amount: 1500, date: '2023-10-12', type: 'expense' },
  { id: '6', description: 'Freelance Work Payment', amount: 15000, date: '2023-10-15', type: 'income' },
];

export const budgets: Budget[] = [
  { id: '1', category: 'Food & Groceries', allocated: 20000, spent: 12500 },
  { id: '2', category: 'Transport', allocated: 10000, spent: 8500 },
  { id: '3', category: 'Airtime & Data', allocated: 5000, spent: 3000 },
  { id: '4', category: 'Entertainment', allocated: 7000, spent: 7500 },
  { id: '5', category: 'School Supplies', allocated: 10000, spent: 5000 },
];

export const bills: Bill[] = [
  { id: '1', name: 'Hostel Rent', amount: 25000, dueDate: '2023-11-01', status: 'Pending' },
  { id: '2', name: 'Coursera Subscription', amount: 15000, dueDate: '2023-10-25', status: 'Pending' },
  { id: '3', name: 'Departmental Dues', amount: 5000, dueDate: '2023-10-15', status: 'Paid' },
  { id: '4', name: 'Netflix Subscription', amount: 4000, dueDate: '2023-09-30', status: 'Overdue' },
];

export const posts: Post[] = [
  {
    slug: 'budgeting-101-for-students',
    title: 'Budgeting 101 for Nigerian Students',
    description: 'Learn the basics of creating a budget that works for your student lifestyle.',
    author: 'Chiamaka Nwosu',
    date: 'October 1, 2023',
    imageUrl: 'https://picsum.photos/600/400',
    content: `
      <p>Creating a budget is the first step towards financial freedom. As a student in Nigeria, managing your finances can be tricky with rising costs. Here’s a simple guide to get you started:</p>
      <h3 class="font-bold mt-4 mb-2">1. Track Your Income</h3>
      <p>Know exactly how much money you get each month. This includes allowances, side-hustle income, and any other gifts.</p>
      <h3 class="font-bold mt-4 mb-2">2. List Your Expenses</h3>
      <p>Categorize your spending. Common categories for students include: food, transport, data, school supplies, and entertainment. Use an app or a simple notebook.</p>
      <h3 class="font-bold mt-4 mb-2">3. Set a Goal</h3>
      <p>What are you saving for? A new laptop? School fees? Having a clear goal helps you stay motivated.</p>
    `,
  },
  {
    slug: 'side-hustles-for-nigerian-students',
    title: 'Top 5 Side Hustles for Nigerian Students',
    description: 'Boost your income with these flexible side hustles you can do while studying.',
    author: 'Adekunle Adebayo',
    date: 'September 25, 2023',
    imageUrl: 'https://picsum.photos/600/400',
    content: `
      <p>Earning extra cash as a student can make a huge difference. Here are five side hustles you can start today:</p>
      <ol class="list-decimal list-inside space-y-2 mt-2">
        <li><strong>Freelance Writing:</strong> Offer your writing skills on platforms like Upwork or Fiverr.</li>
        <li><strong>Social Media Management:</strong> Help small businesses manage their online presence.</li>
        <li><strong>Tutoring:</strong> Teach junior students subjects you excel at.</li>
        <li><strong>Graphic Design:</strong> Use tools like Canva to create designs for clients.</li>
        <li><strong>Delivery Services:</strong> Sign up for services like Gokada or Jumia Foods if you have a bike.</li>
      </ol>
    `,
  },
];

export const threads: Thread[] = [
    { id: '1', title: 'How do you save on food costs in Lagos?', author: 'user_tola', timestamp: '2 days ago', replies: 12, content: "Seriously, food is so expensive now. I'm trying to cut down my food budget. What are your best tips for eating cheap but healthy in Lagos?" },
    { id: '2', title: 'Best student bank account with low fees?', author: 'user_ifeanyi', timestamp: '5 days ago', replies: 8, content: "Which bank is the best for students in Nigeria? I'm looking for one with zero or very low maintenance fees and a good mobile app." },
    { id: '3', title: 'Is investing in crypto a good idea for a student?', author: 'user_binta', timestamp: '1 week ago', replies: 25, content: "I have some extra cash (around 50k) and I'm thinking of putting it in crypto. Is it too risky? What are safer investment options?" },
];
