export type AdminMe = {
  adminId: string;
  name: string;
  phone: string | null;
  email: string | null;
  createdAt: string;
};

export type GroupListItem = {
  id: string;
  name: string;
  currentMonth?: number;
  totalMonths?: number;
  totalDue?: number;
  availableGroupBalance?: number;
  createdAt?: string;
  nextContributionDate?: string;
};

export type Group = {
  id: string;
  name: string;
  monthlyContribution: number;
  interestRate: number;
  fineAmount: number;
  totalMonths: number;
  createdAt?: string;
};

export type Member = {
  id: string;
  name: string;
  contributionDue: number;
  contributionPaid: number;
  fine: number;
  loan: {
    principalRemaining: number;
    unpaidInterest: number;
    unpaidInterestMonths: number;
  };
};

export type DashboardRow = {
  memberId: string;
  name: string;
  contributionDue: number;
  contributionPaid: number;
  fine: number;
  loan: { principal: number; interest: number };
  totalDue: number;
};

export type GroupDashboard = {
  availableGroupBalance: number;
  rows: DashboardRow[];
};

export type LoanIssue = {
  id: string;
  amount: number;
  month: number;
  createdAt: string;
};

export type Payment = {
  id: string;
  amount: number;
  breakdown: {
    fine: number;
    interest: number;
    principal: number;
    contribution: number;
  };
  remaining: {
    principal: number;
    interest: number;
    fine: number;
  };
  month: number;
  createdAt: string;
};

export type AddPaymentResponse = {
  paymentId: string;
  breakdown: Payment['breakdown'];
  remaining: Payment['remaining'];
  createdAt: string;
};

export type GroupCompletionSummary = {
  group: {
    id: string;
    name: string;
    monthlyContribution: number;
    totalMonths: number;
    currentMonth: number;
  };
  totals: {
    totalMembers: number;
    totalExpectedContribution: number;
    totalPaidIn: number;
    totalContributionPaid: number;
    totalFinePaid: number;
    totalInterestPaid: number;
    totalPrincipalPaid: number;
    cashPool: number;
    perMemberPayout: number;
    perMemberProfit: number;
  };
  members: Array<{
    memberId: string;
    name: string;
    contributed: number;
    payout: number;
    profit: number;
  }>;
};
