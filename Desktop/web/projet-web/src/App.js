import React, { useState } from 'react';

// NOTE: Using Emojis for icons to avoid needing to install 'lucide-react'.

// --- ICON MAP (Using Emojis instead of lucide-react) ---
const iconMap = {
    'Tableau de Bord': '📊',
    Inventaire: '📦',
    Mouvements: '🚚',
    Entrepôts: '🏠',
    'Commandes internes': '📋',
    'Alertes & Incidents': '🔔',
    Fournisseurs: '👥',
    'Utilisateurs & Roles': '🧑‍💻',
    Paramètres: '⚙️',
    Boxes: '📦',
    AlertTriangle: '⚠️',
    LineChart: '📈',
    Clock: '🕒',
    Zap: '⚡',
    Clock3: '⌚',
    Hand: '🤚',
    Truck: '🚛',
    CheckCircle: '✅',
    ArrowUp: '▲',
    ArrowDown: '▼',
    Search: '🔍',
    MessageSquare: '💬',
    Bell: '🔔',
    ChevronDown: '▼',
    ChevronRight: '▶',
    Menu: '☰',
    X: '✖',
    Check: '✔️',
};
const Icon = ({ name, className = '' }) => <span className={`inline-block w-5 h-5 align-middle leading-none ${className}`} aria-hidden="true">{iconMap[name]}</span>;

// --- MOCK DATA ---
const navItems = [
    // Changed "Dashboard" to "Tableau de Bord" for French consistency
    { name: "Tableau de Bord", iconName: "Tableau de Bord", page: "Tableau de Bord" },
    { 
        name: "Inventaire", 
        iconName: "Inventaire", 
        count: 5,
        submenu: [
            { name: "Articles", page: "ArticlesList" }, // Added page identifier
            { name: "Catégories", page: "Categories" },
            { name: "Détails Article", page: "ArticleDetails" },
            { name: "Import/Export", page: "ImportExport" },
        ]
    },
    { 
        name: "Mouvements", 
        iconName: "Mouvements", 
        submenu: [
            { name: "Entrées", page: "MovementsIn" },
            { name: "Sorties", page: "MovementsOut" },
            { name: "Transferts", page: "MovementsTransfer" },
            { name: "Historique", page: "MovementsHistory" },
            { name: "Validations", page: "MovementsValidation" },
        ]
    },
    { 
        name: "Entrepôts", 
        iconName: "Entrepôts", 
        count: 2, 
        submenu: [
            { name: "Liste", page: "WarehouseList" },
            { name: "Carte", page: "WarehouseMap" },
            { name: "Capacité & État", page: "WarehouseCapacity" },
            { name: "Responsables", page: "WarehouseManagers" },
        ]
    },
    { name: "Commandes internes", iconName: "Commandes internes", page: "InternalOrders" },
    { name: "Alertes & Incidents", iconName: "Alertes & Incidents", count: 7, page: "Alerts" },
    { name: "Fournisseurs", iconName: "Fournisseurs", page: "Suppliers" },
    { name: "Utilisateurs & Roles", iconName: "Utilisateurs & Roles", page: "UsersAndRoles" },
    { 
        name: "Paramètres", 
        iconName: "Paramètres", 
        submenu: [
            { name: "Configuration", page: "SettingsConfig" },
            { name: "Seuils", page: "SettingsThresholds" },
            { name: "Catégories personnalisées", page: "SettingsCategories" },
            { name: "Sécurité & Sauvegarde", page: "SettingsSecurity" },
        ]
    },
];

// --- MOCK DATA (rest of the dashboard data is kept the same) ---
const summaryData = [
    { title: "Stock total disponible", value: "24,589", unit: "Articles en stock", change: 12, trend: "up", iconName: "Boxes", colorClass: "bg-blue-100/70 text-blue-600" },
    { title: "Articles en rupture", value: "7", unit: "Sous le seuil minimum", change: 3, trend: "down", iconName: "AlertTriangle", colorClass: "bg-red-100/70 text-red-600" },
    { title: "Mouvements récents", value: "348", unit: "Cette semaine", change: 8, trend: "up", iconName: "LineChart", colorClass: "bg-green-100/70 text-green-600" },
    { title: "Réservations en attente", value: "12", unit: "À valider aujourd'hui", change: 0, trend: "flat", iconName: "Clock", colorClass: "bg-yellow-100/70 text-yellow-600" },
];

const alertsData = [
    { type: "Rupture imminente", title: "Écrous M8", detail: "Stock: 12 unités", time: "Il y a 10 min", severity: "Urgent", typeClass: "text-red-600", severityClass: "bg-red-100 text-red-700", iconName: "Zap" },
    { type: "Stock critique", title: "Vis acier M10", detail: "Stock: 5 unités", time: "Il y a 25 min", severity: "Urgent", typeClass: "text-red-600", severityClass: "bg-red-100 text-red-700", iconName: "Clock3" },
    { type: "Article endommagé", title: "Palette bois 120x80", detail: "Entrepôt A", time: "Il y a 1h", severity: "Moyen", typeClass: "text-orange-600", severityClass: "bg-orange-100 text-orange-700", iconName: "Hand" },
    { type: "Retour en retard", title: "Commande #9421", detail: "Client: Dupont SA", time: "Il y a 2h", severity: "Moyen", typeClass: "text-orange-600", severityClass: "bg-orange-100 text-orange-700", iconName: "Truck" },
];

const reservationData = [
    { id: "REQ-1024", article: "Écrous M8 inox", qty: 500, demander: "Jean Martin", entrepot: "Entrepôt A", date: "07/11/2025", status: "En attente" },
    { id: "REQ-1023", article: "Vis acier M10", qty: 250, demander: "Sophie Bernard", entrepot: "Entrepôt B", date: "07/11/2025", status: "En attente" },
    { id: "REQ-1022", article: "Rondelles plates M8", qty: 1000, demander: "Pierre Dubois", entrepot: "Entrepôt C", date: "06/11/2025", status: "En attente" },
    { id: "REQ-1021", article: "Boulons M12", qty: 150, demander: "Marie Dupont", entrepot: "Entrepôt A", date: "06/11/2025", status: "En attente" },
];

const smallAlerts = [
    { iconName: "Truck", title: "Transfert en attente", detail: "Entrepôt B -> Entrepôt C", time: "Il y a 3h", info: true },
    { iconName: "CheckCircle", title: "Validation nécessaire", detail: "50 articles - Entrepôt A -> B", time: "Il y a 4h", info: true },
];

// --- COMPONENTS ---

// Helper component for a single navigation item (handles submenus)
const SidebarItem = ({ item, openSubmenu, setOpenSubmenu, currentPage, setCurrentPage }) => {
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isOpen = hasSubmenu && openSubmenu === item.name;
    const isMainActive = item.page === currentPage || (isOpen && hasSubmenu);

    const toggleSubmenu = (e) => {
        e.preventDefault();
        setOpenSubmenu(isOpen ? null : item.name);
    };

    const handleMainClick = (e) => {
        if (!hasSubmenu && item.page) {
            setCurrentPage(item.page);
        } else if (hasSubmenu) {
            toggleSubmenu(e);
        }
    }

    return (
        <div>
            <a
                href="#"
                onClick={handleMainClick}
                className={`flex items-center justify-between p-3 rounded-xl transition-all duration-150 text-sm font-medium ${isMainActive
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                }`}
            >
                <div className="flex items-center">
                    <Icon name={item.iconName} className="mr-3 text-lg" />
                    <span>{item.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                    {item.count && (
                        <span className={`px-2 py-0.5 text-xs rounded-full ${isMainActive
                            ? 'bg-blue-200 text-blue-800'
                            : 'bg-gray-200 text-gray-700'
                        }`}>
                            {item.count}
                        </span>
                    )}
                    {hasSubmenu && (
                        <Icon name="ChevronDown" className={`text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    )}
                </div>
            </a>
            
            {/* Submenu rendering */}
            {hasSubmenu && (
                <div 
                    className={`overflow-hidden transition-max-height duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}
                    style={{ maxHeight: isOpen ? `${item.submenu.length * 40}px` : '0px' }} // Dynamic max-height for smooth transition
                >
                    <div className="pl-6 border-l border-gray-200 ml-4 space-y-1">
                        {item.submenu.map((subItem) => (
                            <a 
                                key={subItem.name} 
                                href="#" 
                                onClick={(e) => { e.preventDefault(); setCurrentPage(subItem.page); }}
                                className={`block text-sm py-2 pl-4 rounded-lg transition-colors duration-150 
                                            ${currentPage === subItem.page 
                                                ? 'text-blue-700 bg-blue-50 font-medium' 
                                                : 'text-gray-600 hover:bg-gray-100 hover:text-blue-700'
                                            }`}
                            >
                                {subItem.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};


const Sidebar = ({ isOpen, toggleSidebar, openSubmenu, setOpenSubmenu, currentPage, setCurrentPage }) => (
    <>
        {/* Mobile Overlay */}
        {isOpen && (
            <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={toggleSidebar}></div>
        )}

        {/* Sidebar Structure */}
        <aside className={`fixed top-0 bottom-0 left-0 w-64 bg-white border-r border-gray-200 z-50 transition-transform duration-300 ease-in-out
                          ${isOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full lg:translate-x-0'}`}>

            <div className="h-16 px-4 flex justify-between items-center border-b border-gray-200">
                <div className="text-xl font-bold text-blue-700 flex items-center">
                    <Icon name="Zap" className="mr-1 text-2xl" />
                    StoreTrack {/* CHANGED FROM StockFlow */}
                </div>
                <button className="lg:hidden p-2 text-gray-600 hover:text-gray-800" onClick={toggleSidebar}>
                    <Icon name="X" className="text-xl" />
                </button>
            </div>

            <nav className="p-4 flex flex-col space-y-2">
                {navItems.map((item) => (
                    <SidebarItem 
                        key={item.name}
                        item={item} 
                        openSubmenu={openSubmenu} 
                        setOpenSubmenu={setOpenSubmenu} 
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                ))}
            </nav>
        </aside>
    </>
);

const Header = ({ toggleSidebar }) => (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-gray-200 flex items-center px-4 shadow-sm lg:ml-64">
        <div className="flex items-center lg:hidden mr-4">
            <button className="p-2 text-gray-600 hover:text-gray-800" onClick={toggleSidebar}>
                <Icon name="Menu" className="text-xl" />
            </button>
        </div>

        <div className="hidden lg:flex items-center relative w-96">
            <Icon name="Search" className="absolute left-3 text-gray-400 text-lg" />
            <input
                type="text"
                placeholder="Rechercher articles, entrepôts, commandes..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 transition"
            />
        </div>

        <div className="flex items-center ml-auto space-x-4">
            <button className="relative p-2 text-gray-500 hover:text-gray-700 rounded-full transition hover:bg-gray-100">
                <Icon name="MessageSquare" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>
            <button className="relative p-2 text-gray-500 hover:text-gray-700 rounded-full transition hover:bg-gray-100">
                <Icon name="Bell" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>

            <div className="flex items-center p-1 rounded-full cursor-pointer hover:bg-gray-100 transition border border-transparent hover:border-gray-200">
                <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-2">
                    MD
                </div>
                <span className="hidden md:inline text-sm font-medium text-gray-700">Marie Dupont</span>
                <Icon name="ChevronDown" className="hidden md:inline ml-2 text-xs text-gray-500" />
            </div>
        </div>
    </header>
);

// --- VIEW COMPONENTS (PLACEHOLDERS) ---

const ArticlesList = () => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Liste des Articles</h1>
        <p className="text-base text-gray-600 mb-6">Gérez et consultez l'inventaire détaillé de tous vos articles.</p>
        
        <div className="p-10 text-center bg-blue-50 border-2 border-dashed border-blue-200 rounded-xl">
            <Icon name="Inventaire" className="text-5xl text-blue-400 mx-auto block mb-3" />
            <p className="text-lg font-semibold text-blue-700">Page Articles en construction.</p>
            <p className="text-sm text-blue-500">Ici se trouvera le tableau complet de gestion des articles.</p>
        </div>
    </div>
);


// --- DASHBOARD COMPONENTS (Renamed to French) ---

const TableauDeBordContent = () => (
    <>
        <div className="pb-6">
            <div className="sm:flex sm:justify-between sm:items-center">
                <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord</h1>
                <p className="text-sm text-gray-500 mt-1 sm:mt-0 hidden sm:block">Dernière mise à jour: 7 Novembre 2025 à 22:37</p>
            </div>
            <p className="text-base text-gray-600 mt-2">Vue d'overview de votre inventaire multi-sites</p>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
            {/* Main Column (9/12 on XL) */}
            <div className="flex flex-col gap-6 xl:col-span-9">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {summaryData.map((data, index) => (
                        <SummaryCard key={index} {...data} />
                    ))}
                </div>

                {/* Stock Movement Chart Placeholder */}
                <ChartPlaceholder />

                {/* Reservations Table */}
                <ReservationsTable />
            </div>

            {/* Sidebar Column (3/12 on XL) */}
            <div className="flex flex-col gap-6 xl:col-span-3">
                <AlertsSidebar />
                <SmallAlertsPanel />
            </div>
        </div>
    </>
)

// The rest of the small components remain unchanged (SummaryCard, AlertsSidebar, etc.)
// Re-included at the bottom for completeness.

const SummaryCard = ({ title, value, unit, change, trend, iconName, colorClass }) => {
    const isUp = trend === 'up';
    const trendClass = isUp ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-500';
    const TrendIcon = trend === 'up' ? 'ArrowUp' : 'ArrowDown';

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg transition duration-300 hover:shadow-xl border border-gray-100">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                    <h2 className="text-3xl font-bold text-gray-800">{value}</h2>
                    <p className="text-xs text-gray-500 mt-0.5">{unit}</p>
                </div>
                <div className={`p-3 rounded-xl ${colorClass}`}>
                    <Icon name={iconName} className="text-2xl" />
                </div>
            </div>
            {change !== 0 && (
                <div className="mt-4 text-xs flex items-center">
                    <span className={`font-semibold flex items-center ${trendClass}`}>
                        {trend !== 'flat' && <Icon name={TrendIcon} className="mr-1 text-sm" />}
                        {change}%
                    </span>
                    <span className="text-gray-500 ml-1">vs mois dernier</span>
                </div>
            )}
        </div>
    );
};

const AlertsSidebar = () => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Alertes critiques</h3>

        <div className="space-y-4">
            {alertsData.map((alert, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`p-1.5 mt-1 rounded-full text-white ${alert.severityClass.includes('red') ? 'bg-red-500' : 'bg-orange-500'}`}>
                        <Icon name={alert.iconName} className="text-base" />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <p className={`text-sm font-semibold ${alert.typeClass}`}>
                                {alert.type}
                            </p>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${alert.severityClass}`}>
                                {alert.severity}
                            </span>
                        </div>
                        <p className="text-sm font-medium text-gray-800 mt-0.5">{alert.title}</p>
                        <p className="text-xs text-gray-500">{alert.detail}</p>
                        <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const SmallAlertsPanel = () => (
    <div className="flex flex-col space-y-4">
        {smallAlerts.map((alert, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow-md flex justify-between items-start border border-gray-100">
                <div className="flex items-start gap-3">
                    <Icon name={alert.iconName} className="text-xl text-blue-600 mt-0.5" />
                    <div>
                        <p className="text-sm font-medium text-gray-700">{alert.title}</p>
                        <p className="text-xs text-gray-500">{alert.detail}</p>
                        <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
                    </div>
                </div>
                {alert.info && (
                    <button className="text-xs font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded-full transition hover:bg-blue-200">
                        Info
                    </button>
                )}
            </div>
        ))}
        <button className="w-full text-center py-3 bg-gray-100 text-gray-600 font-medium rounded-xl transition hover:bg-gray-200 shadow-md border border-gray-200">
            Voir toutes les alertes
        </button>
    </div>
);

const ReservationsTable = () => (
    <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Réservations à valider</h3>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-800 transition">
                Voir tout
            </button>
        </div>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {["ID", "Article", "Quantité", "Demandeur", "Entrepôt", "Date", "Statut", "Actions"].map((header) => (
                            <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                    {reservationData.map((res) => (
                        <tr key={res.id} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{res.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{res.article}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{res.qty}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{res.demandeur}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{res.entrepot}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{res.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                    {res.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    <Icon name="Check" className="mr-1 text-base" /> Valider
                                </button>
                                <button className="ml-2 inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition">
                                    Refuser
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

// Simplified Chart Placeholder
const ChartPlaceholder = () => (
    <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Mouvements de stock (7 derniers jours)</h3>
        <div className="h-64 relative bg-gray-50 rounded-lg p-4 mt-4">
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-lg">
                <Icon name="LineChart" className="text-4xl mr-2" /> Graphique Placeholder
            </div>
            {/* Mock SVG lines for visual appeal */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute top-0 left-10 right-0 bottom-6 w-[calc(100%-40px)] h-[calc(100%-24px)]">
                <defs>
                    <linearGradient id="gradientBlue" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "rgba(99, 102, 241, 0.7)" }} />
                        <stop offset="100%" style={{ stopColor: "rgba(99, 102, 241, 0.1)" }} />
                    </linearGradient>
                    <linearGradient id="gradientPurple" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "rgba(168, 85, 247, 0.7)" }} />
                        <stop offset="100%" style={{ stopColor: "rgba(168, 85, 247, 0.1)" }} />
                    </linearGradient>
                </defs>
                <path
                    d="M0 80 L20 40 L40 60 L60 20 L80 30 L100 100 L100 100 Z"
                    fill="url(#gradientBlue)"
                    stroke="#6366f1"
                    strokeWidth="0.5"
                />
                <path
                    d="M0 90 L20 70 L40 85 L60 50 L80 65 L100 100 L100 100 Z"
                    fill="url(#gradientPurple)"
                    stroke="#a855f7"
                    strokeWidth="0.5"
                />
            </svg>
            <div className="absolute left-0 top-2 bottom-6 w-8 text-xs text-gray-500 flex flex-col justify-between items-end">
                <span>80</span>
                <span>60</span>
                <span>40</span>
                <span>20</span>
                <span>0</span>
            </div>
            <div className="absolute bottom-0 left-10 right-0 h-4 text-xs text-gray-500 flex justify-between px-3">
                <span>Lun</span>
                <span>Mar</span>
                <span>Mer</span>
                <span>Jeu</span>
                <span>Ven</span>
                <span>Sam</span>
                <span>Dim</span>
            </div>
        </div>
    </div>
);


// --- MAIN APP COMPONENT ---
export default function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    // Initialize currentPage to the new French translation
    const [currentPage, setCurrentPage] = useState("Tableau de Bord");
    // Initialize the submenu for Inventaire to be open by default since "Articles" is the first link
    const [openSubmenu, setOpenSubmenu] = useState("Inventaire"); 

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Function to render the correct content based on the current page state
    const renderContent = () => {
        switch (currentPage) {
            case "ArticlesList":
                return <ArticlesList />;
            case "Tableau de Bord":
            default:
                return <TableauDeBordContent />;
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 font-inter">

            <Sidebar 
                isOpen={isSidebarOpen} 
                toggleSidebar={toggleSidebar} 
                openSubmenu={openSubmenu} 
                setOpenSubmenu={setOpenSubmenu}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <Header toggleSidebar={toggleSidebar} />

            <main className="p-4 lg:p-6 lg:ml-64">
                {renderContent()}
            </main>
        </div>
    );
}