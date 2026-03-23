export type Lang = 'en' | 'hi' | 'bn';

export type TranslationKey =
  | 'app.name'
  | 'language.english'
  | 'language.hindi'
  | 'language.bengali'
  | 'common.back'
  | 'common.save'
  | 'common.loading'
  | 'common.error'
  | 'common.ready'
  | 'common.cancel'
  | 'common.confirm'
  | 'common.tryAgain'
  | 'common.search'
  | 'common.done'
  | 'menu.signOut'
  | 'menu.language'
  | 'auth.signIn.title'
  | 'auth.signIn.subtitle'
  | 'auth.signIn.email'
  | 'auth.signIn.password'
  | 'auth.signIn.button'
  | 'auth.createAccount.title'
  | 'auth.createAccount.subtitle'
  | 'auth.register.title'
  | 'auth.register.subtitle'
  | 'auth.register.detailsTitle'
  | 'auth.register.name'
  | 'auth.register.phoneOptional'
  | 'auth.register.emailOptional'
  | 'auth.register.passwordTitle'
  | 'auth.register.passwordCreate'
  | 'auth.register.creating'
  | 'auth.register.cannotCreateTitle'
  | 'groups.title'
  | 'groups.create'
  | 'groups.empty.title'
  | 'groups.empty.subtitle'
  | 'groups.section'
  | 'groups.completed'
  | 'groups.completedBadge'
  | 'groups.pending'
  | 'groups.monthLabel'
  | 'groups.signOut.title'
  | 'groups.signOut.message'
  | 'groups.signOut.confirm'
  | 'dashboard.title'
  | 'dashboard.createNextMonth'
  | 'dashboard.createNextMonth.confirmTitle'
  | 'dashboard.createNextMonth.confirmText'
  | 'dashboard.createNextMonth.successTitle'
  | 'dashboard.createNextMonth.successMessage'
  | 'dashboard.availableToLend'
  | 'dashboard.amountToCollect'
  | 'dashboard.month'
  | 'dashboard.members'
  | 'dashboard.viewCompletionSummary'
  | 'dashboard.members.section'
  | 'dashboard.filters.all'
  | 'dashboard.filters.clear'
  | 'dashboard.filters.pending'
  | 'dashboard.filters.overdue'
  | 'dashboard.memberRow.subtitle'
  | 'dashboard.status.ok'
  | 'dashboard.status.due'
  | 'dashboard.status.overdue'
  | 'members.title'
  | 'members.section.all'
  | 'members.count.single'
  | 'members.count.multi'
  | 'members.canAdd'
  | 'members.cannotAdd'
  | 'members.empty.none'
  | 'members.empty.noResults'
  | 'member.title'
  | 'member.totalToPay'
  | 'member.minimumToPay'
  | 'member.pendingHint'
  | 'member.loanPending'
  | 'member.principalHint'
  | 'member.breakdown'
  | 'member.breakdown.contribution'
  | 'member.breakdown.interest'
  | 'member.breakdown.fine'
  | 'member.breakdown.principal'
  | 'member.breakdown.hint.overdue'
  | 'member.breakdown.hint.normal'
  | 'member.addPayment'
  | 'member.nothingPending'
  | 'loan.give.title'
  | 'member.tabs.payments'
  | 'member.tabs.loan'
  | 'member.payments.title'
  | 'member.payments.empty'
  | 'member.loan.summaryTitle'
  | 'member.loan.principalRemaining'
  | 'member.loan.unpaidInterest'
  | 'member.loan.historyTitle'
  | 'member.loan.empty'
  | 'payment.add.title'
  | 'payment.totalPayable'
  | 'payment.minimumPayable'
  | 'payment.helper.typeAmount'
  | 'payment.helper.nothingPending'
  | 'payment.helper.tapToFill'
  | 'payment.quick.minimum'
  | 'payment.quick.total'
  | 'payment.amountReceived'
  | 'payment.placeholder.max'
  | 'payment.placeholder.enterAmount'
  | 'payment.summary.paying'
  | 'payment.summary.remainingTotal'
  | 'payment.summary.remainingOverdue'
  | 'payment.invalidAmount.title'
  | 'payment.invalidAmount.message'
  | 'payment.tooMuch.title'
  | 'payment.tooMuch.message.min'
  | 'payment.tooMuch.message.total'
  | 'loan.details.title'
  | 'loan.moneyAvailable'
  | 'loan.memberLoanPending'
  | 'loan.amountSection'
  | 'loan.amount'
  | 'loan.placeholder.upTo'
  | 'loan.placeholder.enter'
  | 'loan.afterGiving'
  | 'loan.invalidAmount.title'
  | 'loan.invalidAmount.message'
  | 'loan.tooMuch.title'
  | 'loan.tooMuch.message'
  | 'loan.notEnoughMoney.title'
  | 'loan.notEnoughMoney.message'
  | 'group.create.title'
  | 'group.create.groupName'
  | 'group.create.monthlyAmount'
  | 'group.create.interest'
  | 'group.create.lateFee'
  | 'group.create.totalMonths'
  | 'group.create.creating'
  | 'group.create.button'
  | 'group.create.cannotTitle'
  | 'group.create.cannotMessage'
  | 'member.add.title'
  | 'member.add.memberName'
  | 'member.add.placeholder'
  | 'member.add.adding'
  | 'member.add.button'
  | 'member.add.invalidName.title'
  | 'member.add.invalidName.message'
  | 'member.add.duplicate.title'
  | 'member.add.duplicate.message'
  | 'member.add.locked.title'
  | 'member.add.locked.message'
  | 'month.start.title'
  | 'month.start.starting'
  | 'month.start.button.starting'
  | 'month.start.button.tryAgain'
  | 'summary.title'
  | 'summary.notReady'
  | 'summary.moneyCollected'
  | 'summary.eachGets'
  | 'summary.profitPerPerson'
  | 'summary.badge.profit'
  | 'summary.badge.loss'
  | 'summary.interest'
  | 'summary.lateFee'
  | 'summary.paymentsPerMember'
  | 'summary.memberRow.subtitle'
  | 'summary.memberRow.gets'
  | 'error.summaryNotAvailable'
  | 'error.cannotCreateAccount'
  | 'error.cannotCreateGroup'
  | 'error.invalidName'
  | 'error.nameAlreadyUsed'
  | 'error.cannotAddMember'
  | 'error.notEnoughMoney'
  | 'error.invalidAmount'
  | 'error.tooMuch'
  | 'error.network'
  | 'error.timeout'
  | 'error.unauthorized'
  | 'groups.createdOn'
  | 'groups.nextContributionOn'
  | 'dashboard.nextMonth.allowedWindow'
  | 'dashboard.nextMonth.noMembers';

export const translations = {
  en: {
    'app.name': 'Committee Khata',

    'language.english': 'English',
    'language.hindi': 'Hindi',
    'language.bengali': 'Bengali',

    'common.back': 'Back',
    'common.save': 'Save',
    'common.loading': 'Loading…',
    'common.error': 'Something went wrong',
    'common.ready': 'Ready',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.tryAgain': 'Try again',
    'common.search': 'Search',
    'common.done': 'Done',

    'menu.signOut': 'Sign out',
    'menu.language': 'Language',

    'auth.signIn.title': 'Sign in',
    'auth.signIn.subtitle': 'Sign in to manage your groups and payments.',
    'auth.signIn.email': 'Email',
    'auth.signIn.password': 'Password',
    'auth.signIn.button': 'Sign in',

    'auth.createAccount.title': 'Create account',
    'auth.createAccount.subtitle': 'Create your account to start using the app.',

    'auth.register.title': 'Create account',
    'auth.register.subtitle': 'Create your account to start using the app.',
    'auth.register.detailsTitle': 'Your details',
    'auth.register.name': 'Name',
    'auth.register.phoneOptional': 'Phone (optional)',
    'auth.register.emailOptional': 'Email (optional)',
    'auth.register.passwordTitle': 'Password',
    'auth.register.passwordCreate': 'Create a password',
    'auth.register.creating': 'Creating…',
    'auth.register.cannotCreateTitle': 'Cannot create account',

    'groups.title': 'My groups',
    'groups.create': 'Create group',
    'groups.section': 'Groups',
    'groups.empty.title': 'No groups yet',
    'groups.empty.subtitle': 'Create your first group to start tracking payments and loans.',
    'groups.completed': 'Completed',
    'groups.completedBadge': 'COMPLETED',
    'groups.pending': 'Pending',
    'groups.monthLabel': 'Month {current}/{total}',
    'groups.signOut.title': 'Sign out',
    'groups.signOut.message': 'Do you want to sign out?',
    'groups.signOut.confirm': 'Sign out',
    'groups.createdOn': 'Created: {date}',
    'groups.nextContributionOn': 'Next contribution: {date}',

    'dashboard.title': 'Dashboard',
    'dashboard.createNextMonth': 'Create next month',
    'dashboard.createNextMonth.confirmTitle': 'Create next month',
    'dashboard.createNextMonth.confirmText': 'Create',
    'dashboard.createNextMonth.successTitle': 'Month created',
    'dashboard.createNextMonth.successMessage': 'Next month created successfully.',
    'dashboard.availableToLend': 'Available to lend',
    'dashboard.amountToCollect': 'Amount to collect',
    'dashboard.month': 'Month',
    'dashboard.members': 'Members',
    'dashboard.viewCompletionSummary': 'View completion summary',
    'dashboard.members.section': 'Members',
    'dashboard.filters.all': 'All',
    'dashboard.filters.clear': 'Clear',
    'dashboard.filters.pending': 'Pending',
    'dashboard.filters.overdue': 'Overdue',
    'dashboard.memberRow.subtitle': 'Min ₹ {min}  •  Total ₹ {total}',
    'dashboard.status.ok': 'OK',
    'dashboard.status.due': 'DUE',
    'dashboard.status.overdue': 'OVERDUE',
    'dashboard.nextMonth.allowedWindow': 'Next month can only be created within ±2 days of {target} (Allowed: {start} to {end}).',
    'dashboard.nextMonth.noMembers': 'Add at least one member before creating the next month.',

    'members.title': 'Members',
    'members.section.all': 'All members',
    'members.count.single': '1 member',
    'members.count.multi': '{count} members',
    'members.canAdd': 'You can add members before Month 1 starts.',
    'members.cannotAdd': 'You can’t add new members after the committee starts.',
    'members.empty.none': 'No members added yet.',
    'members.empty.noResults': 'No results found.',

    'member.title': 'Member',
    'member.totalToPay': 'Total to pay',
    'member.minimumToPay': 'Minimum to pay',
    'member.pendingHint': '(pending)',
    'member.loanPending': 'Loan amount pending',
    'member.principalHint': '(principal)',
    'member.breakdown': 'Breakdown',
    'member.breakdown.contribution': 'Contribution',
    'member.breakdown.interest': 'Interest',
    'member.breakdown.fine': 'Fine',
    'member.breakdown.principal': 'Principal',
    'member.breakdown.hint.overdue': 'overdue',
    'member.breakdown.hint.normal': 'normal',
    'member.addPayment': 'Add payment',
    'member.nothingPending': 'Nothing pending',
    'loan.give.title': 'Give loan',
    'member.tabs.payments': 'Payments',
    'member.tabs.loan': 'Loan',
    'member.payments.title': 'Payments',
    'member.payments.empty': 'No payments yet.',
    'member.loan.summaryTitle': 'Loan summary',
    'member.loan.principalRemaining': 'Principal remaining',
    'member.loan.unpaidInterest': 'Unpaid interest',
    'member.loan.historyTitle': 'Loan taken history',
    'member.loan.empty': 'No loans issued yet.',

    'payment.add.title': 'Add payment',
    'payment.totalPayable': 'Total payable',
    'payment.minimumPayable': 'Minimum payable (overdue)',
    'payment.helper.typeAmount': 'Type the amount you received.',
    'payment.helper.nothingPending': 'Nothing is pending for this member.',
    'payment.helper.tapToFill': 'Tap a button to fill the amount quickly.',
    'payment.quick.minimum': 'Pay minimum',
    'payment.quick.total': 'Pay total',
    'payment.amountReceived': 'Amount received',
    'payment.placeholder.max': 'Max ₹{max}',
    'payment.placeholder.enterAmount': 'Enter amount',
    'payment.summary.paying': 'You are paying:',
    'payment.summary.remainingTotal': 'Remaining total payable:',
    'payment.summary.remainingOverdue': 'Overdue remaining:',
    'payment.invalidAmount.title': 'Invalid amount',
    'payment.invalidAmount.message': 'Please enter an amount greater than 0.',
    'payment.tooMuch.title': 'Too much',
    'payment.tooMuch.message.min': 'Amount cannot be more than minimum payable (₹{max}).',
    'payment.tooMuch.message.total': 'Amount cannot be more than total payable (₹{max}).',

    'loan.details.title': 'Details',
    'loan.moneyAvailable': 'Money available',
    'loan.memberLoanPending': 'Member loan pending',
    'loan.amountSection': 'Loan amount',
    'loan.amount': 'Amount',
    'loan.placeholder.upTo': 'Up to ₹{max}',
    'loan.placeholder.enter': 'Enter amount',
    'loan.afterGiving': 'After giving this loan, money available:',
    'loan.invalidAmount.title': 'Invalid amount',
    'loan.invalidAmount.message': 'Enter a valid amount greater than 0.',
    'loan.tooMuch.title': 'Too much',
    'loan.tooMuch.message': 'Loan amount cannot be more than available to lend (₹{max}).',
    'loan.notEnoughMoney.title': 'Not enough money',
    'loan.notEnoughMoney.message': 'This group does not have enough money available to give this loan.',

    'group.create.title': 'New group',
    'group.create.groupName': 'Group name',
    'group.create.monthlyAmount': 'Monthly amount',
    'group.create.interest': 'Interest (%)',
    'group.create.lateFee': 'Late fee',
    'group.create.totalMonths': 'Total months',
    'group.create.creating': 'Creating…',
    'group.create.button': 'Create group',
    'group.create.cannotTitle': 'Cannot create group',
    'group.create.cannotMessage': 'Please try again.',

    'member.add.title': 'Add member',
    'member.add.memberName': 'Member name',
    'member.add.placeholder': 'Type name',
    'member.add.adding': 'Adding…',
    'member.add.button': 'Add',
    'member.add.invalidName.title': 'Invalid name',
    'member.add.invalidName.message': 'Please enter a name.',
    'member.add.duplicate.title': 'Name already used',
    'member.add.duplicate.message': 'This member name is already in this group.',
    'member.add.locked.title': 'Cannot add member',
    'member.add.locked.message': 'You can only add members before Month 1 starts.',

    'month.start.title': 'Start next month',
    'month.start.starting': 'Starting the next month…',
    'month.start.button.starting': 'Starting…',
    'month.start.button.tryAgain': 'Try again',

    'summary.title': 'Group summary',
    'summary.notReady': 'Summary is not ready yet.',
    'summary.moneyCollected': 'Money collected',
    'summary.eachGets': 'Each person gets',
    'summary.profitPerPerson': 'Profit per person',
    'summary.badge.profit': 'PROFIT',
    'summary.badge.loss': 'LOSS',
    'summary.interest': 'Interest',
    'summary.lateFee': 'Late fee',
    'summary.paymentsPerMember': 'Payments per member',
    'summary.memberRow.subtitle': 'Paid {paid} • Profit {profit}',
    'summary.memberRow.gets': 'Gets',

    'error.summaryNotAvailable': 'Summary not available',
    'error.cannotCreateAccount': 'Cannot create account',
    'error.cannotCreateGroup': 'Cannot create group',
    'error.invalidName': 'Invalid name',
    'error.nameAlreadyUsed': 'Name already used',
    'error.cannotAddMember': 'Cannot add member',
    'error.notEnoughMoney': 'Not enough money',
    'error.invalidAmount': 'Invalid amount',
    'error.tooMuch': 'Too much',
    'error.network': 'Network error. Please check your internet connection and try again.',
    'error.timeout': 'Request timed out. Please try again.',
    'error.unauthorized': 'Your session has expired. Please sign in again.',
  },

  hi: {
    'app.name': 'कमेटी खाता',

    'language.english': 'English',
    'language.hindi': 'हिंदी',
    'language.bengali': 'বাংলা',

    'common.back': 'वापस',
    'common.save': 'सेव',
    'common.loading': 'लोड हो रहा है…',
    'common.error': 'कुछ गलत हो गया',
    'common.ready': 'तैयार',
    'common.cancel': 'रद्द',
    'common.confirm': 'पक्का करें',
    'common.tryAgain': 'फिर से करें',
    'common.search': 'खोजें',
    'common.done': 'हो गया',

    'menu.signOut': 'साइन आउट',
    'menu.language': 'भाषा',

    'auth.signIn.title': 'साइन इन',
    'auth.signIn.subtitle': 'अपने ग्रुप और भुगतान मैनेज करने के लिए साइन इन करें।',
    'auth.signIn.email': 'ईमेल',
    'auth.signIn.password': 'पासवर्ड',
    'auth.signIn.button': 'साइन इन',

    'auth.createAccount.title': 'खाता बनाएँ',
    'auth.createAccount.subtitle': 'ऐप इस्तेमाल करने के लिए अपना खाता बनाएँ।',

    'auth.register.title': 'खाता बनाएँ',
    'auth.register.subtitle': 'ऐप इस्तेमाल करने के लिए अपना खाता बनाएँ।',
    'auth.register.detailsTitle': 'आपकी जानकारी',
    'auth.register.name': 'नाम',
    'auth.register.phoneOptional': 'फोन (वैकल्पिक)',
    'auth.register.emailOptional': 'ईमेल (वैकल्पिक)',
    'auth.register.passwordTitle': 'पासवर्ड',
    'auth.register.passwordCreate': 'पासवर्ड बनाएँ',
    'auth.register.creating': 'बन रहा है…',
    'auth.register.cannotCreateTitle': 'खाता नहीं बन पा रहा',

    'groups.title': 'मेरे ग्रुप',
    'groups.create': 'ग्रुप बनाएँ',
    'groups.section': 'ग्रुप',
    'groups.empty.title': 'अभी कोई ग्रुप नहीं',
    'groups.empty.subtitle': 'भुगतान और लोन ट्रैक करने के लिए पहला ग्रुप बनाएँ।',
    'groups.completed': 'पूरा',
    'groups.completedBadge': 'COMPLETED',
    'groups.pending': 'बाकी',
    'groups.monthLabel': 'महीना {current}/{total}',
    'groups.signOut.title': 'साइन आउट',
    'groups.signOut.message': 'क्या आप साइन आउट करना चाहते हैं?',
    'groups.signOut.confirm': 'साइन आउट',
    'groups.createdOn': 'बनाया गया: {date}',
    'groups.nextContributionOn': 'अगला योगदान: {date}',

    'dashboard.title': 'डैशबोर्ड',
    'dashboard.createNextMonth': 'अगला महीना बनाएं',
    'dashboard.createNextMonth.confirmTitle': 'अगला महीना बनाएं',
    'dashboard.createNextMonth.confirmText': 'बनाएं',
    'dashboard.createNextMonth.successTitle': 'महीना बन गया',
    'dashboard.createNextMonth.successMessage': 'अगला महीना बन गया।',
    'dashboard.availableToLend': 'लोन देने के लिए उपलब्ध',
    'dashboard.amountToCollect': 'वसूलने की राशि',
    'dashboard.month': 'महीना',
    'dashboard.members': 'सदस्य',
    'dashboard.viewCompletionSummary': 'समापन सारांश देखें',
    'dashboard.members.section': 'सदस्य',
    'dashboard.filters.all': 'सभी',
    'dashboard.filters.clear': 'क्लियर',
    'dashboard.filters.pending': 'बाकी',
    'dashboard.filters.overdue': 'ओवरड्यू',
    'dashboard.memberRow.subtitle': 'कम से कम ₹ {min}  •  कुल ₹ {total}',
    'dashboard.status.ok': 'OK',
    'dashboard.status.due': 'DUE',
    'dashboard.status.overdue': 'OVERDUE',
    'dashboard.nextMonth.allowedWindow': 'अगला महीना केवल {target} के ±2 दिनों के भीतर बनाया जा सकता है (अनुमत: {start} से {end}).',
    'dashboard.nextMonth.noMembers': 'अगला महीना बनाने से पहले कम से कम एक सदस्य जोड़ें।',

    'members.title': 'सदस्य',
    'members.section.all': 'सभी सदस्य',
    'members.count.single': '1 सदस्य',
    'members.count.multi': '{count} सदस्य',
    'members.canAdd': 'महीना 1 शुरू होने से पहले सदस्य जोड़ सकते हैं।',
    'members.cannotAdd': 'कमेटी शुरू होने के बाद नए सदस्य नहीं जोड़ सकते।',
    'members.empty.none': 'अभी कोई सदस्य नहीं।',
    'members.empty.noResults': 'कोई परिणाम नहीं मिला।',

    'member.title': 'सदस्य',
    'member.totalToPay': 'कुल देना है',
    'member.minimumToPay': 'कम से कम देना है',
    'member.pendingHint': '(बाकी)',
    'member.loanPending': 'लोन बाकी',
    'member.principalHint': '(मूलधन)',
    'member.breakdown': 'विवरण',
    'member.breakdown.contribution': 'किस्त',
    'member.breakdown.interest': 'ब्याज',
    'member.breakdown.fine': 'जुर्माना',
    'member.breakdown.principal': 'मूलधन',
    'member.breakdown.hint.overdue': 'ओवरड्यू',
    'member.breakdown.hint.normal': 'सामान्य',
    'member.addPayment': 'भुगतान जोड़ें',
    'member.nothingPending': 'कुछ बाकी नहीं',
    'loan.give.title': 'लोन दें',
    'member.tabs.payments': 'भुगतान',
    'member.tabs.loan': 'लोन',
    'member.payments.title': 'भुगतान',
    'member.payments.empty': 'अभी कोई भुगतान नहीं।',
    'member.loan.summaryTitle': 'लोन सारांश',
    'member.loan.principalRemaining': 'बाकी मूलधन',
    'member.loan.unpaidInterest': 'बाकी ब्याज',
    'member.loan.historyTitle': 'लोन इतिहास',
    'member.loan.empty': 'अभी कोई लोन नहीं दिया गया।',

    'payment.add.title': 'भुगतान जोड़ें',
    'payment.totalPayable': 'कुल देना है',
    'payment.minimumPayable': 'कम से कम (ओवरड्यू)',
    'payment.helper.typeAmount': 'मिली हुई राशि लिखें।',
    'payment.helper.nothingPending': 'इस सदस्य के लिए कुछ बाकी नहीं है।',
    'payment.helper.tapToFill': 'राशि जल्दी भरने के लिए बटन दबाएँ।',
    'payment.quick.minimum': 'कम से कम',
    'payment.quick.total': 'पूरा',
    'payment.amountReceived': 'मिली हुई राशि',
    'payment.placeholder.max': 'अधिकतम ₹{max}',
    'payment.placeholder.enterAmount': 'राशि लिखें',
    'payment.summary.paying': 'आप दे रहे हैं:',
    'payment.summary.remainingTotal': 'कुल में बाकी:',
    'payment.summary.remainingOverdue': 'ओवरड्यू में बाकी:',
    'payment.invalidAmount.title': 'गलत राशि',
    'payment.invalidAmount.message': 'कृपया 0 से बड़ी राशि लिखें।',
    'payment.tooMuch.title': 'बहुत ज्यादा',
    'payment.tooMuch.message.min': 'राशि कम से कम से ज्यादा नहीं हो सकती (₹{max}).',
    'payment.tooMuch.message.total': 'राशि कुल से ज्यादा नहीं हो सकती (₹{max}).',

    'loan.details.title': 'जानकारी',
    'loan.moneyAvailable': 'उपलब्ध पैसा',
    'loan.memberLoanPending': 'सदस्य का लोन बाकी',
    'loan.amountSection': 'लोन राशि',
    'loan.amount': 'राशि',
    'loan.placeholder.upTo': '₹{max} तक',
    'loan.placeholder.enter': 'राशि लिखें',
    'loan.afterGiving': 'लोन देने के बाद उपलब्ध:',
    'loan.invalidAmount.title': 'गलत राशि',
    'loan.invalidAmount.message': '0 से बड़ी सही राशि लिखें।',
    'loan.tooMuch.title': 'बहुत ज्यादा',
    'loan.tooMuch.message': 'लोन राशि उपलब्ध से ज्यादा नहीं हो सकती (₹{max}).',
    'loan.notEnoughMoney.title': 'पैसा कम है',
    'loan.notEnoughMoney.message': 'इस ग्रुप में इतना पैसा उपलब्ध नहीं है।',

    'group.create.title': 'नया ग्रुप',
    'group.create.groupName': 'ग्रुप नाम',
    'group.create.monthlyAmount': 'मासिक राशि',
    'group.create.interest': 'ब्याज (%)',
    'group.create.lateFee': 'लेट फी',
    'group.create.totalMonths': 'कुल महीने',
    'group.create.creating': 'बन रहा है…',
    'group.create.button': 'ग्रुप बनाएँ',
    'group.create.cannotTitle': 'ग्रुप नहीं बन रहा',
    'group.create.cannotMessage': 'कृपया फिर से करें।',

    'member.add.title': 'सदस्य जोड़ें',
    'member.add.memberName': 'सदस्य नाम',
    'member.add.placeholder': 'नाम लिखें',
    'member.add.adding': 'जोड़ रहे हैं…',
    'member.add.button': 'जोड़ें',
    'member.add.invalidName.title': 'गलत नाम',
    'member.add.invalidName.message': 'कृपया नाम लिखें।',
    'member.add.duplicate.title': 'नाम पहले से है',
    'member.add.duplicate.message': 'यह नाम इस ग्रुप में पहले से है।',
    'member.add.locked.title': 'सदस्य नहीं जोड़ सकते',
    'member.add.locked.message': 'महीना 1 शुरू होने से पहले ही सदस्य जोड़ सकते हैं।',

    'month.start.title': 'अगला महीना शुरू करें',
    'month.start.starting': 'अगला महीना शुरू हो रहा है…',
    'month.start.button.starting': 'शुरू हो रहा है…',
    'month.start.button.tryAgain': 'फिर से करें',

    'summary.title': 'ग्रुप सारांश',
    'summary.notReady': 'सारांश अभी तैयार नहीं है।',
    'summary.moneyCollected': 'कुल जमा',
    'summary.eachGets': 'हर व्यक्ति को',
    'summary.profitPerPerson': 'प्रति व्यक्ति फायदा',
    'summary.badge.profit': 'PROFIT',
    'summary.badge.loss': 'LOSS',
    'summary.interest': 'ब्याज',
    'summary.lateFee': 'लेट फी',
    'summary.paymentsPerMember': 'सदस्य भुगतान',
    'summary.memberRow.subtitle': 'जमा {paid} • फायदा {profit}',
    'summary.memberRow.gets': 'मिलेगा',

    'error.summaryNotAvailable': 'सारांश उपलब्ध नहीं',
    'error.cannotCreateAccount': 'खाता नहीं बन पा रहा',
    'error.cannotCreateGroup': 'ग्रुप नहीं बन रहा',
    'error.invalidName': 'गलत नाम',
    'error.nameAlreadyUsed': 'नाम पहले से है',
    'error.cannotAddMember': 'सदस्य नहीं जोड़ सकते',
    'error.notEnoughMoney': 'पैसा कम है',
    'error.invalidAmount': 'गलत राशि',
    'error.tooMuch': 'बहुत ज्यादा',
    'error.network': 'नेटवर्क त्रुटि। कृपया अपना इंटरनेट कनेक्शन जांचें और फिर से कोशिश करें।',
    'error.timeout': 'अनुरोध का समय समाप्त हो गया। कृपया फिर से कोशिश करें।',
    'error.unauthorized': 'आपका सत्र समाप्त हो गया है। कृपया फिर से साइन इन करें।',
  },

  bn: {
    'app.name': 'কমিটি খাতা',

    'language.english': 'English',
    'language.hindi': 'হিন্দি',
    'language.bengali': 'বাংলা',

    'common.back': 'ফিরে যান',
    'common.save': 'সেভ',
    'common.loading': 'লোড হচ্ছে…',
    'common.error': 'কিছু ভুল হয়েছে',
    'common.ready': 'প্রস্তুত',
    'common.cancel': 'বাতিল',
    'common.confirm': 'নিশ্চিত করুন',
    'common.tryAgain': 'আবার চেষ্টা',
    'common.search': 'খুঁজুন',
    'common.done': 'হয়ে গেছে',

    'menu.signOut': 'সাইন আউট',
    'menu.language': 'ভাষা',

    'auth.signIn.title': 'সাইন ইন',
    'auth.signIn.subtitle': 'আপনার গ্রুপ এবং পেমেন্ট ম্যানেজ করতে সাইন ইন করুন।',
    'auth.signIn.email': 'ইমেইল',
    'auth.signIn.password': 'পাসওয়ার্ড',
    'auth.signIn.button': 'সাইন ইন',

    'auth.createAccount.title': 'অ্যাকাউন্ট তৈরি করুন',
    'auth.createAccount.subtitle': 'অ্যাপ ব্যবহার করতে আপনার অ্যাকাউন্ট তৈরি করুন।',

    'auth.register.title': 'অ্যাকাউন্ট তৈরি করুন',
    'auth.register.subtitle': 'অ্যাপ ব্যবহার করতে আপনার অ্যাকাউন্ট তৈরি করুন।',
    'auth.register.detailsTitle': 'আপনার তথ্য',
    'auth.register.name': 'নাম',
    'auth.register.phoneOptional': 'ফোন (ঐচ্ছিক)',
    'auth.register.emailOptional': 'ইমেইল (ঐচ্ছিক)',
    'auth.register.passwordTitle': 'পাসওয়ার্ড',
    'auth.register.passwordCreate': 'পাসওয়ার্ড তৈরি করুন',
    'auth.register.creating': 'তৈরি হচ্ছে…',
    'auth.register.cannotCreateTitle': 'অ্যাকাউন্ট তৈরি হচ্ছে না',

    'groups.title': 'আমার গ্রুপ',
    'groups.create': 'গ্রুপ তৈরি করুন',
    'groups.section': 'গ্রুপ',
    'groups.empty.title': 'এখনো কোনো গ্রুপ নেই',
    'groups.empty.subtitle': 'পেমেন্ট ও লোন ট্র্যাক করতে প্রথম গ্রুপ তৈরি করুন।',
    'groups.completed': 'সম্পন্ন',
    'groups.completedBadge': 'COMPLETED',
    'groups.pending': 'বাকি',
    'groups.monthLabel': 'মাস {current}/{total}',
    'groups.signOut.title': 'সাইন আউট',
    'groups.signOut.message': 'আপনি কি সাইন আউট করতে চান?',
    'groups.signOut.confirm': 'সাইন আউট',
    'groups.createdOn': 'তৈরি: {date}',
    'groups.nextContributionOn': 'পরবর্তী চাঁদা: {date}',

    'dashboard.title': 'ড্যাশবোর্ড',
    'dashboard.createNextMonth': 'পরের মাস তৈরি করুন',
    'dashboard.createNextMonth.confirmTitle': 'পরের মাস তৈরি করুন',
    'dashboard.createNextMonth.confirmText': 'তৈরি',
    'dashboard.createNextMonth.successTitle': 'মাস তৈরি হয়েছে',
    'dashboard.createNextMonth.successMessage': 'পরের মাস সফলভাবে তৈরি হয়েছে।',
    'dashboard.availableToLend': 'লোন দেওয়ার জন্য আছে',
    'dashboard.amountToCollect': 'তোলার টাকা',
    'dashboard.month': 'মাস',
    'dashboard.members': 'সদস্য',
    'dashboard.viewCompletionSummary': 'সমাপ্তির সারাংশ দেখুন',
    'dashboard.members.section': 'সদস্য',
    'dashboard.filters.all': 'সব',
    'dashboard.filters.clear': 'ক্লিয়ার',
    'dashboard.filters.pending': 'বাকি',
    'dashboard.filters.overdue': 'ওভারডিউ',
    'dashboard.memberRow.subtitle': 'কমপক্ষে ₹ {min}  •  মোট ₹ {total}',
    'dashboard.status.ok': 'OK',
    'dashboard.status.due': 'DUE',
    'dashboard.status.overdue': 'OVERDUE',
    'dashboard.nextMonth.allowedWindow': 'পরবর্তী মাস শুধু {target} তারিখের ±2 দিনের মধ্যে তৈরি করা যাবে (অনুমতি: {start} থেকে {end}).',
    'dashboard.nextMonth.noMembers': 'পরবর্তী মাস তৈরির আগে অন্তত একজন সদস্য যোগ করুন।',

    'members.title': 'সদস্য',
    'members.section.all': 'সব সদস্য',
    'members.count.single': '1 সদস্য',
    'members.count.multi': '{count} সদস্য',
    'members.canAdd': 'মাস 1 শুরু হওয়ার আগে সদস্য যোগ করতে পারবেন।',
    'members.cannotAdd': 'কমিটি শুরু হওয়ার পরে নতুন সদস্য যোগ করা যাবে না।',
    'members.empty.none': 'এখনো কোনো সদস্য নেই।',
    'members.empty.noResults': 'কিছু পাওয়া যায়নি।',

    'member.title': 'সদস্য',
    'member.totalToPay': 'মোট দিতে হবে',
    'member.minimumToPay': 'কমপক্ষে দিতে হবে',
    'member.pendingHint': '(বাকি)',
    'member.loanPending': 'লোন বাকি',
    'member.principalHint': '(মূলধন)',
    'member.breakdown': 'বিবরণ',
    'member.breakdown.contribution': 'কিস্তি',
    'member.breakdown.interest': 'সুদ',
    'member.breakdown.fine': 'জরিমানা',
    'member.breakdown.principal': 'মূলধন',
    'member.breakdown.hint.overdue': 'ওভারডিউ',
    'member.breakdown.hint.normal': 'স্বাভাবিক',
    'member.addPayment': 'পেমেন্ট যোগ করুন',
    'member.nothingPending': 'কিছু বাকি নেই',
    'loan.give.title': 'লোন দিন',
    'member.tabs.payments': 'পেমেন্ট',
    'member.tabs.loan': 'লোন',
    'member.payments.title': 'পেমেন্ট',
    'member.payments.empty': 'এখনো কোনো পেমেন্ট নেই।',
    'member.loan.summaryTitle': 'লোন সারাংশ',
    'member.loan.principalRemaining': 'বাকি মূলধন',
    'member.loan.unpaidInterest': 'বাকি সুদ',
    'member.loan.historyTitle': 'লোন ইতিহাস',
    'member.loan.empty': 'এখনো কোনো লোন দেওয়া হয়নি।',

    'payment.add.title': 'পেমেন্ট যোগ করুন',
    'payment.totalPayable': 'মোট দিতে হবে',
    'payment.minimumPayable': 'কমপক্ষে (ওভারডিউ)',
    'payment.helper.typeAmount': 'আপনি যে টাকা পেয়েছেন তা লিখুন।',
    'payment.helper.nothingPending': 'এই সদস্যের জন্য কিছু বাকি নেই।',
    'payment.helper.tapToFill': 'দ্রুত ভরতে বাটন চাপুন।',
    'payment.quick.minimum': 'কমপক্ষে',
    'payment.quick.total': 'পুরো',
    'payment.amountReceived': 'পাওয়া টাকা',
    'payment.placeholder.max': 'সর্বোচ্চ ₹{max}',
    'payment.placeholder.enterAmount': 'টাকা লিখুন',
    'payment.summary.paying': 'আপনি দিচ্ছেন:',
    'payment.summary.remainingTotal': 'মোট বাকি:',
    'payment.summary.remainingOverdue': 'ওভারডিউ বাকি:',
    'payment.invalidAmount.title': 'ভুল টাকা',
    'payment.invalidAmount.message': 'অনুগ্রহ করে 0-এর বেশি টাকা লিখুন।',
    'payment.tooMuch.title': 'খুব বেশি',
    'payment.tooMuch.message.min': 'কমপক্ষে থেকে বেশি হতে পারবে না (₹{max}).',
    'payment.tooMuch.message.total': 'মোট থেকে বেশি হতে পারবে না (₹{max}).',

    'loan.details.title': 'তথ্য',
    'loan.moneyAvailable': 'উপলব্ধ টাকা',
    'loan.memberLoanPending': 'সদস্যের লোন বাকি',
    'loan.amountSection': 'লোনের টাকা',
    'loan.amount': 'টাকা',
    'loan.placeholder.upTo': '₹{max} পর্যন্ত',
    'loan.placeholder.enter': 'টাকা লিখুন',
    'loan.afterGiving': 'লোন দেওয়ার পরে উপলব্ধ:',
    'loan.invalidAmount.title': 'ভুল টাকা',
    'loan.invalidAmount.message': '0-এর বেশি সঠিক টাকা লিখুন।',
    'loan.tooMuch.title': 'খুব বেশি',
    'loan.tooMuch.message': 'উপলব্ধের বেশি লোন দেওয়া যাবে না (₹{max}).',
    'loan.notEnoughMoney.title': 'টাকা কম',
    'loan.notEnoughMoney.message': 'এই গ্রুপে এত টাকা উপলব্ধ নেই।',

    'group.create.title': 'নতুন গ্রুপ',
    'group.create.groupName': 'গ্রুপের নাম',
    'group.create.monthlyAmount': 'মাসিক টাকা',
    'group.create.interest': 'সুদ (%)',
    'group.create.lateFee': 'লেট ফি',
    'group.create.totalMonths': 'মোট মাস',
    'group.create.creating': 'তৈরি হচ্ছে…',
    'group.create.button': 'গ্রুপ তৈরি করুন',
    'group.create.cannotTitle': 'গ্রুপ তৈরি হচ্ছে না',
    'group.create.cannotMessage': 'আবার চেষ্টা করুন।',

    'member.add.title': 'সদস্য যোগ করুন',
    'member.add.memberName': 'সদস্যের নাম',
    'member.add.placeholder': 'নাম লিখুন',
    'member.add.adding': 'যোগ হচ্ছে…',
    'member.add.button': 'যোগ করুন',
    'member.add.invalidName.title': 'ভুল নাম',
    'member.add.invalidName.message': 'অনুগ্রহ করে নাম লিখুন।',
    'member.add.duplicate.title': 'নাম আগে থেকেই আছে',
    'member.add.duplicate.message': 'এই নামটি এই গ্রুপে আগে থেকেই আছে।',
    'member.add.locked.title': 'সদস্য যোগ করা যাবে না',
    'member.add.locked.message': 'মাস 1 শুরু হওয়ার আগেই সদস্য যোগ করা যায়।',

    'month.start.title': 'পরের মাস শুরু করুন',
    'month.start.starting': 'পরের মাস শুরু হচ্ছে…',
    'month.start.button.starting': 'শুরু হচ্ছে…',
    'month.start.button.tryAgain': 'আবার চেষ্টা',

    'summary.title': 'গ্রুপ সারাংশ',
    'summary.notReady': 'সারাংশ এখনো প্রস্তুত নয়।',
    'summary.moneyCollected': 'জমা হয়েছে',
    'summary.eachGets': 'প্রতি জন পায়',
    'summary.profitPerPerson': 'প্রতি জন লাভ',
    'summary.badge.profit': 'PROFIT',
    'summary.badge.loss': 'LOSS',
    'summary.interest': 'সুদ',
    'summary.lateFee': 'লেট ফি',
    'summary.paymentsPerMember': 'সদস্য অনুযায়ী পেমেন্ট',
    'summary.memberRow.subtitle': 'দিয়েছে {paid} • লাভ {profit}',
    'summary.memberRow.gets': 'পাবে',

    'error.summaryNotAvailable': 'সারাংশ পাওয়া যাচ্ছে না',
    'error.cannotCreateAccount': 'অ্যাকাউন্ট তৈরি হচ্ছে না',
    'error.cannotCreateGroup': 'গ্রুপ তৈরি হচ্ছে না',
    'error.invalidName': 'ভুল নাম',
    'error.nameAlreadyUsed': 'নাম আগে থেকেই আছে',
    'error.cannotAddMember': 'সদস্য যোগ করা যাবে না',
    'error.notEnoughMoney': 'টাকা কম',
    'error.invalidAmount': 'ভুল টাকা',
    'error.tooMuch': 'খুব বেশি',
    'error.network': 'নেটওয়ার্ক সমস্যা। অনুগ্রহ করে ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।',
    'error.timeout': 'অনুরোধের সময় শেষ হয়ে গেছে। অনুগ্রহ করে আবার চেষ্টা করুন।',
    'error.unauthorized': 'আপনার সেশন শেষ হয়ে গেছে। অনুগ্রহ করে আবার সাইন ইন করুন।',
  },
} as const;
