document.addEventListener('DOMContentLoaded', function() {
        lucide.createIcons();

        const mockEvents = [
            { id: 'e1', title: 'Full-Stack Web Dev Bootcamp', description: 'A 3-day intensive workshop covering everything from React to Node.js.', event_date: '2025-08-15', contact_email: 'admissions@nagpurcoding.com', provider: { id: 'p1', full_name: 'Nagpur Coding Academy' }, is_approved: true, imageUrl: 'https://placehold.co/600x400/f59e0b/ffffff?text=Tech+Event', category: 'Tech', level: 'Beginner', mode: 'Offline' },
            { id: 'e2', title: 'Digital Marketing Masterclass', description: 'Learn SEO, SEM, and social media strategies from industry experts.', event_date: '2025-08-20', contact_email: 'contact@marketminds.in', provider: { id: 'p2', full_name: 'Market Minds Institute' }, is_approved: true, imageUrl: 'https://placehold.co/600x400/8b5cf6/ffffff?text=Business', category: 'Business', level: 'Intermediate', mode: 'Online' },
            { id: 'e3', title: 'Introduction to UI/UX Design', description: 'A beginner-friendly course on the principles of user interface and user experience design with Figma.', event_date: '2025-09-01', contact_email: 'info@designlab.io', provider: { id: 'p1', full_name: 'Nagpur Coding Academy' }, is_approved: false, imageUrl: 'https://placehold.co/600x400/ec4899/ffffff?text=Tech', category: 'Tech', level: 'Beginner', mode: 'Online' },
            { id: 'e4', title: 'Advanced Python for Data Science', description: 'Dive deep into Pandas, NumPy, and Scikit-learn.', event_date: '2025-08-22', contact_email: 'learn@datasci.co', provider: { id: 'p3', full_name: 'Data Science Hub' }, is_approved: true, imageUrl: 'https://placehold.co/600x400/10b981/ffffff?text=Tech', category: 'Tech', level: 'Advanced', mode: 'Offline' },
            { id: 'e5', title: 'Public Speaking Workshop', description: 'Gain confidence and learn to deliver compelling presentations.', event_date: '2025-09-05', contact_email: 'speak@confidentsouls.org', provider: { id: 'p4', full_name: 'Confident Souls' }, is_approved: true, imageUrl: 'https://placehold.co/600x400/3b82f6/ffffff?text=Soft+Skills', category: 'Soft Skills', level: 'Beginner', mode: 'Offline' },
            { id: 'e6', title: 'Cloud Computing with AWS', description: 'Get certified with our comprehensive AWS solutions architect associate course.', event_date: '2025-09-10', contact_email: 'aws@cloudgurus.in', provider: { id: 'p2', full_name: 'Market Minds Institute' }, is_approved: false, imageUrl: 'https://placehold.co/600x400/f97316/ffffff?text=Tech', category: 'Tech', level: 'Intermediate', mode: 'Online' },
            { id: 'e7', title: 'Past Graphic Design Seminar', description: 'This event should not be visible.', event_date: '2025-07-10', contact_email: 'past@events.com', provider: { id: 'p1', full_name: 'Nagpur Coding Academy' }, is_approved: true, imageUrl: 'https://placehold.co/600x400/d946ef/ffffff?text=Design', category: 'Tech', level: 'Beginner', mode: 'Offline' },
            { id: 'e8', title: 'Agile Project Management', description: 'Master Scrum and Kanban for efficient project delivery.', event_date: '2025-09-12', contact_email: 'agile@pm.com', provider: { id: 'p2', full_name: 'Market Minds Institute' }, is_approved: true, imageUrl: 'https://placehold.co/600x400/6366f1/ffffff?text=Business', category: 'Business', level: 'Intermediate', mode: 'Online' },
            { id: 'e9', title: 'Leadership & Team Management', description: 'Develop essential leadership skills for the modern workplace.', event_date: '2025-09-18', contact_email: 'lead@skills.com', provider: { id: 'p4', full_name: 'Confident Souls' }, is_approved: true, imageUrl: 'https://placehold.co/600x400/0ea5e9/ffffff?text=Soft+Skills', category: 'Soft Skills', level: 'Advanced', mode: 'Offline' },
            { id: 'e10', title: 'Cybersecurity Fundamentals', description: 'Protect systems from cyber threats. No prior experience needed.', event_date: '2025-09-25', contact_email: 'secure@nagpurcoding.com', provider: { id: 'p1', full_name: 'Nagpur Coding Academy' }, is_approved: true, imageUrl: 'https://placehold.co/600x400/ef4444/ffffff?text=Tech', category: 'Tech', level: 'Beginner', mode: 'Online' },
        ];
        
        const mockUsers = {
            'student@test.com': { id: 's1', password: 'password123', name: 'Test Student', email: 'student@test.com', registeredEvents: ['e2', 'e4'] },
            'provider@test.com': { id: 'p1', password: 'password123', name: 'Nagpur Coding Academy' }
        };
        
        let state = {
            currentUser: null,
            currentUserRole: null, 
            currentPage: 1,
            eventsPerPage: 6,
        };

        const eventsGrid = document.getElementById('events-grid');
        const searchInput = document.getElementById('search');
        const sortSelect = document.getElementById('sort');
        const categoryFilter = document.getElementById('category-filter');
        const levelFilter = document.getElementById('level-filter');
        const modeFilter = document.getElementById('mode-filter');
        const noResultsDiv = document.getElementById('no-results');
        const loadMoreBtn = document.getElementById('load-more-btn');
        
        const studentView = document.getElementById('student-view');
        const providerDashboardView = document.getElementById('provider-dashboard-view');
        const adminView = document.getElementById('admin-view');
        const studentDashboardView = document.getElementById('student-dashboard-view');
        const pricingView = document.getElementById('pricing-view');
        const contactView = document.getElementById('contact-view');
        const providerProfileView = document.getElementById('provider-profile-view');
        
        const homeLink = document.getElementById('home-link');
        const pricingLink = document.getElementById('pricing-link');
        const contactLink = document.getElementById('contact-link');
        const eventForm = document.getElementById('event-form');
        const providerMessage = document.getElementById('provider-message');
        const contactForm = document.getElementById('contact-form');
        
        const navLinks = document.getElementById('nav-links');
        const studentNavLinks = document.getElementById('student-nav-links');
        const providerNavLinks = document.getElementById('provider-nav-links');
        const adminNavLinks = document.getElementById('admin-nav-links');

        const studentLoginBtn = document.getElementById('student-login-btn');
        const studentAuthModal = document.getElementById('student-auth-modal');
        const studentLoginForm = document.getElementById('student-login-form');
        const cancelStudentLoginBtn = document.getElementById('cancel-student-login-btn');
        const studentLoginError = document.getElementById('student-login-error');
        const studentLogoutBtn = document.getElementById('student-logout-btn');
        const studentDashboardLink = document.getElementById('student-dashboard-link');
        const registeredEventsGrid = document.getElementById('registered-events-grid');
        const noRegisteredEventsDiv = document.getElementById('no-registered-events');
        
        // New Registration Modal Elements
        const studentRegistrationModal = document.getElementById('student-registration-modal');
        const studentRegistrationForm = document.getElementById('student-registration-form');
        const cancelStudentRegistrationBtn = document.getElementById('cancel-student-registration-btn');
        const studentRegistrationError = document.getElementById('student-registration-error');
        const showRegisterModalLink = document.getElementById('show-register-modal-link');
        const showLoginModalLink = document.getElementById('show-login-modal-link');

        const providerLoginBtn = document.getElementById('provider-login-btn');
        const providerAuthModal = document.getElementById('provider-auth-modal');
        const providerLoginForm = document.getElementById('provider-login-form');
        const cancelProviderLoginBtn = document.getElementById('cancel-provider-login-btn');
        const providerLoginError = document.getElementById('provider-login-error');
        const providerDashboardLink = document.getElementById('provider-dashboard-link');
        const providerLogoutBtn = document.getElementById('provider-logout-btn');
        const providerEventsList = document.getElementById('provider-events-list');
        const noProviderEventsDiv = document.getElementById('no-provider-events');

        const adminLoginBtn = document.getElementById('admin-login-btn');
        const adminModal = document.getElementById('admin-modal');
        const adminLoginForm = document.getElementById('admin-login-form');
        const cancelLoginBtn = document.getElementById('cancel-login-btn');
        const loginError = document.getElementById('login-error');
        const adminLogoutBtn = document.getElementById('admin-logout-btn');
        
        const adminEventList = document.getElementById('admin-event-list');
        const noAdminEventsMsg = document.getElementById('no-admin-events-msg');
        const totalEventsStat = document.getElementById('total-events-stat');
        const pendingEventsStat = document.getElementById('pending-events-stat');
        const approvedEventsStat = document.getElementById('approved-events-stat');

        const confirmationModal = document.getElementById('confirmation-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalMessage = document.getElementById('modal-message');
        const modalConfirmBtn = document.getElementById('modal-confirm-btn');
        const modalCancelBtn = document.getElementById('modal-cancel-btn');

        const eventRegistrationModal = document.getElementById('event-registration-modal');
        const registrationModalTitle = document.getElementById('registration-modal-title');
        const eventRegistrationFormModal = document.getElementById('event-registration-form-modal');
        const cancelRegistrationBtn = document.getElementById('cancel-registration-btn');
        const regEventIdInput = document.getElementById('reg-event-id');
        const regFullNameInput = document.getElementById('reg-full-name');
        const regEmailInput = document.getElementById('reg-email');

        const billingToggle = document.getElementById('billing-toggle');
        const profPriceEl = document.getElementById('prof-price');
        const profBillingEl = document.getElementById('prof-billing');
        const teamPriceEl = document.getElementById('team-price');
        const teamBillingEl = document.getElementById('team-billing');

        const toastNotification = document.getElementById('toast-notification');
        const toastMessage = document.getElementById('toast-message');

        const providerNameHeader = document.getElementById('provider-name-header');
        const providerEventsGrid = document.getElementById('provider-events-grid');
        const noProviderProfileEvents = document.getElementById('no-provider-profile-events');
        const backToEventsBtn = document.getElementById('back-to-events-btn');
        
        let actionToConfirm = null;

        function applyFiltersAndSort() {
            const searchTerm = searchInput.value.toLowerCase();
            const sortValue = sortSelect.value;
            const categoryValue = categoryFilter.value;
            const levelValue = levelFilter.value;
            const modeValue = modeFilter.value;
            
            let filteredEvents = mockEvents
                .filter(event => new Date(event.event_date) >= new Date(new Date().toDateString()))
                .filter(event => event.is_approved)
                .filter(event => 
                    event.title.toLowerCase().includes(searchTerm) || 
                    event.provider.full_name.toLowerCase().includes(searchTerm)
                )
                .filter(event => !categoryValue || event.category === categoryValue)
                .filter(event => !levelValue || event.level === levelValue)
                .filter(event => !modeValue || event.mode === modeValue);

            switch(sortValue) {
                case 'date_asc': filteredEvents.sort((a, b) => new Date(a.event_date) - new Date(b.event_date)); break;
                case 'date_desc': filteredEvents.sort((a, b) => new Date(b.event_date) - new Date(a.event_date)); break;
                case 'title_asc': filteredEvents.sort((a, b) => a.title.localeCompare(b.title)); break;
            }
            return filteredEvents;
        }

        function renderEvents() {
            const filteredEvents = applyFiltersAndSort();
            
            if (state.currentPage === 1) {
                eventsGrid.innerHTML = '';
            }

            const startIndex = (state.currentPage - 1) * state.eventsPerPage;
            const endIndex = startIndex + state.eventsPerPage;
            const eventsToRender = filteredEvents.slice(startIndex, endIndex);

            if (filteredEvents.length === 0) {
                noResultsDiv.classList.remove('hidden');
                loadMoreBtn.classList.add('hidden');
            } else {
                noResultsDiv.classList.add('hidden');
                eventsToRender.forEach(event => {
                    eventsGrid.appendChild(createEventCard(event));
                });
                
                if (filteredEvents.length > endIndex) {
                    loadMoreBtn.classList.remove('hidden');
                } else {
                    loadMoreBtn.classList.add('hidden');
                }
            }
            lucide.createIcons();
        }
        
        function createEventCard(event) {
            const card = document.createElement('div');
            card.className = 'bg-gray-800 rounded-xl card-shadow overflow-hidden flex flex-col';
            const formattedDate = new Date(event.event_date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
            
            let actionButtonsHTML = `<a href="mailto:${event.contact_email}" class="text-sm font-semibold text-amber-500 hover:text-amber-400">Contact</a>`;

            if (state.currentUserRole === 'student') {
                const isRegistered = state.currentUser.registeredEvents.includes(event.id);
                if (isRegistered) {
                     actionButtonsHTML = `
                        <div class="flex items-center space-x-2">
                            <button data-id="${event.id}" class="reminder-btn flex items-center text-sm font-medium text-blue-400 hover:text-blue-300"><i data-lucide="bell" class="h-4 w-4 mr-1"></i>Set Reminder</button>
                            <button class="text-sm font-medium text-white px-3 py-1 rounded-md bg-green-600 cursor-not-allowed">Registered</button>
                        </div>`;
                } else {
                    actionButtonsHTML = `<button data-id="${event.id}" class="register-event-btn text-sm font-medium text-white px-3 py-1 rounded-md bg-amber-600 hover:bg-amber-700">Register</button>`;
                }
            }

            card.innerHTML = `
                <img src="${event.imageUrl}" alt="${event.title}" class="w-full h-40 object-cover" onerror="this.onerror=null;this.src='https://placehold.co/600x400/cccccc/ffffff?text=Image';">
                <div class="p-6 flex-grow">
                    <a href="#" class="provider-link text-sm font-semibold text-amber-400 hover:underline mb-1 inline-block" data-provider-id="${event.provider.id}">${event.provider.full_name}</a>
                    <h3 class="text-xl font-bold text-white mb-2 truncate">${event.title}</h3>
                    <p class="text-gray-300 text-sm mb-4 h-10 overflow-hidden">${event.description}</p>
                </div>
                <div class="flex items-center justify-between mt-auto p-6 pt-4 border-t border-gray-700">
                    <div class="flex items-center">
                        <i data-lucide="calendar" class="w-4 h-4 text-gray-400 mr-2"></i>
                        <span class="text-sm font-medium text-gray-300">${formattedDate}</span>
                    </div>
                    ${actionButtonsHTML}
                </div>`;
            return card;
        }

        function updateAdminStats() {
            const approvedCount = mockEvents.filter(e => e.is_approved).length;
            const pendingCount = mockEvents.filter(e => !e.is_approved).length;
            totalEventsStat.textContent = mockEvents.length;
            approvedEventsStat.textContent = approvedCount;
            pendingEventsStat.textContent = pendingCount;
        }

        function renderAdminDashboard() {
            updateAdminStats();
            adminEventList.innerHTML = '';
            const allEvents = mockEvents.sort((a,b) => new Date(b.event_date) - new Date(a.event_date));

            if (allEvents.length === 0) {
                noAdminEventsMsg.classList.remove('hidden');
                noAdminEventsMsg.textContent = "No events have been submitted yet.";
            } else {
                noAdminEventsMsg.classList.add('hidden');
                allEvents.forEach(event => {
                    adminEventList.appendChild(createAdminCard(event));
                });
            }
            lucide.createIcons();
        }

        function createAdminCard(event) {
            const card = document.createElement('div');
            const statusClass = event.is_approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
            const statusText = event.is_approved ? 'Approved' : 'Pending';
            card.className = 'bg-gray-800 rounded-xl card-shadow p-4 flex flex-col md:flex-row items-start md:items-center justify-between';
            const formattedDate = new Date(event.event_date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
            card.innerHTML = `
                <div class="flex-grow mb-4 md:mb-0 md:mr-4">
                    <div class="flex items-center mb-1">
                        <p class="font-bold text-lg text-white mr-3">${event.title}</p>
                        <span class="text-xs font-medium px-2.5 py-0.5 rounded-full ${statusClass}">${statusText}</span>
                    </div>
                    <p class="text-sm text-gray-400">${event.provider.full_name} - <span class="font-medium">${formattedDate}</span></p>
                    <p class="text-sm text-gray-300 mt-1">${event.description}</p>
                </div>
                <div class="flex-shrink-0 flex space-x-2">
                    ${!event.is_approved ? `<button data-id="${event.id}" data-action="approve" class="action-btn inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700">Approve</button>` : ''}
                    <button data-id="${event.id}" data-action="reject" class="action-btn inline-flex items-center justify-center py-2 px-4 border border-gray-600 shadow-sm text-sm font-medium rounded-lg text-gray-200 bg-gray-700 hover:bg-gray-600">Reject</button>
                </div>`;
            return card;
        }

        function renderStudentDashboard() {
            registeredEventsGrid.innerHTML = '';
            const registeredEvents = mockEvents.filter(event => state.currentUser.registeredEvents.includes(event.id));

            if (registeredEvents.length === 0) {
                noRegisteredEventsDiv.classList.remove('hidden');
            } else {
                noRegisteredEventsDiv.classList.add('hidden');
                registeredEvents.forEach(event => {
                    registeredEventsGrid.appendChild(createEventCard(event));
                });
            }
            lucide.createIcons();
        }
        
        function renderProviderDashboard() {
            providerEventsList.innerHTML = '';
            const myEvents = mockEvents.filter(event => event.provider.id === state.currentUser.id);

            if (myEvents.length === 0) {
                noProviderEventsDiv.classList.remove('hidden');
            } else {
                noProviderEventsDiv.classList.add('hidden');
                myEvents.sort((a,b) => new Date(b.event_date) - new Date(a.event_date)).forEach(event => {
                    providerEventsList.appendChild(createProviderEventItem(event));
                });
            }
            lucide.createIcons();
        }
        
        function renderProviderProfile(providerId) {
            const provider = Object.values(mockUsers).find(u => u.id === providerId) || mockEvents.find(e => e.provider.id === providerId)?.provider;
            if (!provider) return;

            providerNameHeader.textContent = `Events by ${provider.full_name || provider.name}`;
            providerEventsGrid.innerHTML = '';
            const providerEvents = mockEvents.filter(e => e.provider.id === providerId && e.is_approved && new Date(e.event_date) >= new Date(new Date().toDateString()));

            if (providerEvents.length === 0) {
                noProviderProfileEvents.classList.remove('hidden');
            } else {
                noProviderProfileEvents.classList.add('hidden');
                providerEvents.forEach(event => {
                    providerEventsGrid.appendChild(createEventCard(event));
                });
            }
            showView(providerProfileView);
            lucide.createIcons();
        }


        function createProviderEventItem(event) {
            const item = document.createElement('div');
            const statusClass = event.is_approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
            const statusText = event.is_approved ? 'Approved' : 'Pending';
            item.className = 'bg-gray-800 rounded-xl card-shadow p-4 flex items-center justify-between';
            const formattedDate = new Date(event.event_date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
            item.innerHTML = `
                <div>
                    <p class="font-bold text-md text-white">${event.title}</p>
                    <p class="text-sm text-gray-400">${formattedDate}</p>
                </div>
                <span class="text-xs font-medium px-2.5 py-0.5 rounded-full ${statusClass}">${statusText}</span>
            `;
            return item;
        }

        function showView(viewToShow) {
            [studentView, providerDashboardView, adminView, studentDashboardView, pricingView, contactView, providerProfileView].forEach(view => {
                if (view) view.classList.add('hidden');
            });
            if (viewToShow) viewToShow.classList.remove('hidden');
            window.scrollTo(0, 0);
        }

        function updateHeader() {
            navLinks.classList.add('hidden');
            studentNavLinks.classList.add('hidden');
            providerNavLinks.classList.add('hidden');
            adminNavLinks.classList.add('hidden');

            if (state.currentUserRole === 'student') {
                studentNavLinks.classList.remove('hidden');
            } else if (state.currentUserRole === 'provider') {
                providerNavLinks.classList.remove('hidden');
            } else if (state.currentUserRole === 'admin') {
                adminNavLinks.classList.remove('hidden');
            } else {
                navLinks.classList.remove('hidden');
            }
        }

        function handleFormSubmit(e) {
            e.preventDefault();
            if (state.currentUserRole !== 'provider') return;
            const formData = new FormData(eventForm);
            const newEvent = {
                id: 'e' + (mockEvents.length + 1),
                title: formData.get('title'),
                description: formData.get('description'),
                event_date: formData.get('date'),
                contact_email: formData.get('email'),
                imageUrl: formData.get('imageUrl'),
                provider: { id: state.currentUser.id, full_name: state.currentUser.name },
                is_approved: false,
                category: formData.get('category'),
                level: formData.get('level'),
                mode: formData.get('mode')
            };
            mockEvents.push(newEvent);
            providerMessage.innerHTML = `<p class="text-green-600 font-semibold">Event submitted successfully for approval!</p>`;
            eventForm.reset();
            renderProviderDashboard();
            setTimeout(() => { providerMessage.innerHTML = ''; }, 3000);
        }
        
        function handleContactFormSubmit(e) {
            e.preventDefault();
            showToast('Thank you! Your message has been sent.');
            contactForm.reset();
        }

        function showModal(modal) {
            modal.classList.remove('hidden');
            setTimeout(() => modal.classList.remove('opacity-0'), 10);
        }

        function hideModal(modal) {
            modal.classList.add('opacity-0');
            setTimeout(() => {
                modal.classList.add('hidden');
                const errorEl = modal.querySelector('.text-red-500');
                if(errorEl) {
                    errorEl.classList.add('hidden');
                }
                const formEl = modal.querySelector('form');
                if(formEl) {
                    formEl.reset();
                }
            }, 300);
        }

        function showToast(message) {
            toastMessage.textContent = message;
            toastNotification.classList.remove('transform', 'translate-x-full', 'opacity-0');
            setTimeout(() => {
                toastNotification.classList.add('transform', 'translate-x-full', 'opacity-0');
            }, 3000);
        }
        
        function showConfirmationModal(action, eventId) {
            actionToConfirm = { action, eventId };
            const event = mockEvents.find(e => e.id === eventId);
            if (!event) return;

            const isReject = action === 'reject';
            modalTitle.textContent = `Confirm ${isReject ? 'Rejection' : 'Approval'}`;
            modalMessage.textContent = `Are you sure you want to ${action} the event "${event.title}"?`;
            modalConfirmBtn.className = `px-4 py-2 text-white text-base font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 ${isReject ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'}`;
            modalConfirmBtn.textContent = isReject ? 'Reject' : 'Approve';
            
            showModal(confirmationModal);
        }

        function handleStudentLogin(e) {
            e.preventDefault();
            const email = studentLoginForm.elements['student-email'].value;
            const password = studentLoginForm.elements['student-password'].value;
            const user = mockUsers[email];

            if (user && user.password === password) {
                state.currentUser = user;
                state.currentUserRole = 'student';
                hideModal(studentAuthModal);
                updateHeader();
                state.currentPage = 1;
                renderEvents();
            } else {
                studentLoginError.classList.remove('hidden');
            }
        }
        
        function handleStudentRegistration(e) {
            e.preventDefault();
            const name = studentRegistrationForm.elements['register-name'].value;
            const email = studentRegistrationForm.elements['register-email'].value;
            const password = studentRegistrationForm.elements['register-password'].value;
            const confirmPassword = studentRegistrationForm.elements['register-confirm-password'].value;

            if (password !== confirmPassword) {
                studentRegistrationError.textContent = "Passwords do not match.";
                studentRegistrationError.classList.remove('hidden');
                return;
            }

            if (mockUsers[email]) {
                studentRegistrationError.textContent = "An account with this email already exists.";
                studentRegistrationError.classList.remove('hidden');
                return;
            }

            const newUserId = 's' + (Object.keys(mockUsers).filter(k => k.startsWith('student')).length + 2);
            mockUsers[email] = {
                id: newUserId,
                password: password,
                name: name,
                email: email,
                registeredEvents: []
            };

            hideModal(studentRegistrationModal);
            showToast('Registration successful! Please log in.');
            showModal(studentAuthModal);
        }
        
        function handleProviderLogin(e) {
            e.preventDefault();
            const email = providerLoginForm.elements['provider-email'].value;
            const password = providerLoginForm.elements['provider-password'].value;
            const user = mockUsers[email];

            if (user && user.password === password) {
                state.currentUser = user;
                state.currentUserRole = 'provider';
                hideModal(providerAuthModal);
                updateHeader();
                showView(providerDashboardView);
                renderProviderDashboard();
            } else {
                providerLoginError.classList.remove('hidden');
            }
        }

        function handleLogout() {
            state.currentUser = null;
            state.currentUserRole = null;
            updateHeader();
            showView(studentView);
            state.currentPage = 1;
            renderEvents();
        }

        function handleAdminLogin(e) {
            e.preventDefault();
            const password = adminLoginForm.elements.password.value;
            if (password === 'admin123') {
                state.currentUserRole = 'admin';
                hideModal(adminModal);
                updateHeader();
                showView(adminView);
                renderAdminDashboard();
            } else {
                loginError.classList.remove('hidden');
            }
        }
        
        function handleAdminAction(e) {
            const target = e.target.closest('.action-btn');
            if (!target) return;
            
            const eventId = target.dataset.id;
            const action = target.dataset.action;
            showConfirmationModal(action, eventId);
        }

        function executeConfirmedAction() {
            if (!actionToConfirm) return;
            const { action, eventId } = actionToConfirm;
            const eventIndex = mockEvents.findIndex(event => event.id === eventId);
            if (eventIndex === -1) return;

            if (action === 'approve') {
                mockEvents[eventIndex].is_approved = true;
            } else if (action === 'reject') {
                mockEvents.splice(eventIndex, 1);
            }
            
            hideModal(confirmationModal);
            actionToConfirm = null;
            renderAdminDashboard();
            state.currentPage = 1;
            renderEvents();
        }

        function handleCardClick(e) {
            const registerBtn = e.target.closest('.register-event-btn');
            const reminderBtn = e.target.closest('.reminder-btn');
            const providerLink = e.target.closest('.provider-link');

            if (registerBtn) {
                if(state.currentUserRole === 'student') {
                    const eventId = registerBtn.dataset.id;
                    const event = mockEvents.find(e => e.id === eventId);
                    if (event) {
                        showRegistrationModal(event);
                    }
                } else {
                    showModal(studentAuthModal);
                }
            }

            if (reminderBtn && state.currentUserRole === 'student') {
                const eventId = reminderBtn.dataset.id;
                const event = mockEvents.find(e => e.id === eventId);
                showToast(`Reminder set for "${event.title}"!`);
            }
            
            if (providerLink) {
                e.preventDefault();
                const providerId = providerLink.dataset.providerId;
                renderProviderProfile(providerId);
            }
        }
        
        function showRegistrationModal(event) {
            if (!state.currentUser) return;
            
            registrationModalTitle.textContent = `Register for "${event.title}"`;
            regEventIdInput.value = event.id;
            regFullNameInput.value = state.currentUser.name;
            regEmailInput.value = state.currentUser.email;

            showModal(eventRegistrationModal);
        }
        
        function handleEventRegistration(e) {
            e.preventDefault();
            const eventId = regEventIdInput.value;
            const registeredEvents = state.currentUser.registeredEvents;
            const eventIndex = registeredEvents.indexOf(eventId);

            if (eventIndex === -1) {
                registeredEvents.push(eventId);
                showToast("Successfully registered for the event!");
            }
            
            hideModal(eventRegistrationModal);
            
            if (!studentView.classList.contains('hidden')) renderEvents();
            if (!studentDashboardView.classList.contains('hidden')) renderStudentDashboard();
        }


        function handleFilterChange() {
            state.currentPage = 1;
            renderEvents();
        }

        // --- Event Listeners ---
        searchInput.addEventListener('keyup', handleFilterChange);
        sortSelect.addEventListener('change', handleFilterChange);
        categoryFilter.addEventListener('change', handleFilterChange);
        levelFilter.addEventListener('change', handleFilterChange);
        modeFilter.addEventListener('change', handleFilterChange);

        loadMoreBtn.addEventListener('click', () => {
            state.currentPage++;
            renderEvents();
        });

        homeLink.addEventListener('click', () => { showView(studentView); state.currentPage = 1; renderEvents(); });
        pricingLink.addEventListener('click', () => showView(pricingView));
        contactLink.addEventListener('click', () => showView(contactView));
        backToEventsBtn.addEventListener('click', () => { showView(studentView); state.currentPage = 1; renderEvents(); });
        
        eventForm.addEventListener('submit', handleFormSubmit);
        contactForm.addEventListener('submit', handleContactFormSubmit);
        
        studentLoginBtn.addEventListener('click', () => showModal(studentAuthModal));
        cancelStudentLoginBtn.addEventListener('click', () => hideModal(studentAuthModal));
        studentLoginForm.addEventListener('submit', handleStudentLogin);
        studentLogoutBtn.addEventListener('click', handleLogout);
        studentDashboardLink.addEventListener('click', () => { showView(studentDashboardView); renderStudentDashboard(); });

        // Registration Modal Listeners
        showRegisterModalLink.addEventListener('click', (e) => {
            e.preventDefault();
            hideModal(studentAuthModal);
            showModal(studentRegistrationModal);
        });
        showLoginModalLink.addEventListener('click', (e) => {
            e.preventDefault();
            hideModal(studentRegistrationModal);
            showModal(studentAuthModal);
        });
        cancelStudentRegistrationBtn.addEventListener('click', () => hideModal(studentRegistrationModal));
        studentRegistrationForm.addEventListener('submit', handleStudentRegistration);


        providerLoginBtn.addEventListener('click', () => {
            if (state.currentUserRole === 'provider') {
                showView(providerDashboardView);
                renderProviderDashboard();
            } else {
                showModal(providerAuthModal);
            }
        });
        cancelProviderLoginBtn.addEventListener('click', () => hideModal(providerAuthModal));
        providerLoginForm.addEventListener('submit', handleProviderLogin);
        providerLogoutBtn.addEventListener('click', handleLogout);
        providerDashboardLink.addEventListener('click', () => { showView(providerDashboardView); renderProviderDashboard(); });

        adminLoginBtn.addEventListener('click', () => showModal(adminModal));
        cancelLoginBtn.addEventListener('click', () => hideModal(adminModal));
        adminLoginForm.addEventListener('submit', handleAdminLogin);
        adminLogoutBtn.addEventListener('click', handleLogout);
        
        adminEventList.addEventListener('click', handleAdminAction);
        
        modalConfirmBtn.addEventListener('click', executeConfirmedAction);
        modalCancelBtn.addEventListener('click', () => hideModal(confirmationModal));

        document.addEventListener('click', handleCardClick);
        
        eventRegistrationFormModal.addEventListener('submit', handleEventRegistration);
        cancelRegistrationBtn.addEventListener('click', () => hideModal(eventRegistrationModal));


        // Pricing Toggle Logic
        const monthlyPrices = { prof: 17, team: 28 };
        const yearlyPrices = { prof: 144, team: 240 };

        billingToggle.addEventListener('change', (e) => {
            const isYearly = e.target.checked;
            if(isYearly) {
                profPriceEl.innerHTML = `$${(yearlyPrices.prof / 12).toFixed(0)}<span class="text-lg font-medium">/month</span>`;
                profBillingEl.textContent = `Billed annually at $${yearlyPrices.prof} / year`;

                teamPriceEl.innerHTML = `$${(yearlyPrices.team / 12).toFixed(0)}<span class="text-lg font-medium">/month</span>`;
                teamBillingEl.textContent = `Billed annually at $${yearlyPrices.team} / year`;
            } else {
                profPriceEl.innerHTML = `$${monthlyPrices.prof}<span class="text-lg font-medium">/month</span>`;
                profBillingEl.textContent = `Billed monthly`;

                teamPriceEl.innerHTML = `$${monthlyPrices.team}<span class="text-lg font-medium">/month</span>`;
                teamBillingEl.textContent = `Billed monthly`;
            }
        });

        // --- Initial Render ---
        updateHeader();
        showView(studentView);
        renderEvents();
    });