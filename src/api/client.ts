import type {
    AddPaymentResponse,
    AdminMe,
    Group,
    GroupCompletionSummary,
    GroupDashboard,
    GroupListItem,
    LoanIssue,
    Member,
    Payment
} from '../types/api';
import { apiFetch } from './http';

export const api = {
  auth: {
    register: (body: { name: string; phone?: string; email?: string; password: string }) =>
      apiFetch<{ adminId: string; token: string }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
    login: (body: { email: string; password: string }) =>
      apiFetch<{ token: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
    me: (token: string) => apiFetch<AdminMe>('/auth/me', { token }),
  },

  groups: {
    list: (token: string) => apiFetch<GroupListItem[]>('/groups', { token }),
    create: (
      token: string,
      body: {
        name: string;
        monthlyContribution: number;
        interestRate: number;
        fineAmount: number;
        totalMonths: number;
      },
    ) =>
      apiFetch<{ id: string; name: string }>('/groups', {
        token,
        method: 'POST',
        body: JSON.stringify(body),
      }),
    get: (token: string, groupId: string) => apiFetch<Group>(`/groups/${groupId}`, { token }),
    delete: (token: string, groupId: string) =>
      apiFetch<void>(`/groups/${groupId}`, { token, method: 'DELETE' }),
    dashboard: (token: string, groupId: string) =>
      apiFetch<GroupDashboard>(`/groups/${groupId}/dashboard`, { token }),
    summary: (token: string, groupId: string) =>
      apiFetch<GroupCompletionSummary>(`/groups/${groupId}/summary`, { token }),
    members: {
      list: (token: string, groupId: string) => apiFetch<Member[]>(`/groups/${groupId}/members`, { token }),
      add: (token: string, groupId: string, body: { name: string }) =>
        apiFetch<{ id: string; name: string }>(`/groups/${groupId}/members`, {
          token,
          method: 'POST',
          body: JSON.stringify(body),
        }),
      createMonth: (token: string, groupId: string, month?: number) =>
        apiFetch<{ month: number; status: 'created' }>(`/groups/${groupId}/months`, {
          token,
          method: 'POST',
          body: JSON.stringify(month ? { month } : {}),
        }),
    },
  },

  members: {
    get: (token: string, memberId: string) => apiFetch<any>(`/members/${memberId}`, { token }),
    loan: (token: string, memberId: string) => apiFetch<any>(`/members/${memberId}/loan`, { token }),
    loans: (token: string, memberId: string) => apiFetch<LoanIssue[]>(`/members/${memberId}/loans`, { token }),
    payments: (token: string, memberId: string) => apiFetch<Payment[]>(`/members/${memberId}/payments`, { token }),
    delete: (token: string, memberId: string) => apiFetch<void>(`/members/${memberId}`, { token, method: 'DELETE' }),
  },

  loans: {
    issue: (token: string, body: { memberId: string; amount: number }) =>
      apiFetch<{ loanId: string; principalRemaining: number; unpaidInterest: number }>('/loans', {
        token,
        method: 'POST',
        body: JSON.stringify(body),
      }),
  },

  payments: {
    add: (token: string, body: { memberId: string; amount: number }) =>
      apiFetch<AddPaymentResponse>('/payments', {
        token,
        method: 'POST',
        body: JSON.stringify(body),
      }),
  },
};
