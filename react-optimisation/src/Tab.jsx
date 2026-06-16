import { useState, useCallback, memo } from "react";

const HTML = "HTML", CSS = "CSS", JS = "JavaScript";
const TABS = [HTML, CSS, JS];
const TAB_CONTENT = {
    [HTML]: (
        <p>
            The HyperText Markup Language or HTML is the standard markup language for
            documents designed to be displayed in a web browser.
        </p>
    ),
    [CSS]: (
        <p>
            Cascading Style Sheets is a style sheet language used for describing the
            presentation of a document written in a markup language such as HTML or
            XML.
        </p>
    ),
    [JS]: (
        <p>
            JavaScript, often abbreviated as JS, is a programming language that is one
            of the core technologies of the World Wide Web, alongside HTML and CSS.
        </p>
    ),
};

const TabItem = memo(({ tab, onTabClick, isActive }) => {
    console.log("TabItem Re-rendered", tab)
    return (
        <button tabIndex="0" data-id={tab} onClick={onTabClick} className={isActive ? "active" : ""} >
            {tab}
        </button>
    );
});

/*
    here instead of creating external store and subscribing to that using useSyncExternalStore 
    we are directly using react's memo, useCallback to prevent un-necessary re-render
*/
export default function Tabs() {
    console.log("Tabs Re-rendered")

    const [activeTab, setActiveTab] = useState(HTML);

    const handleTabClick = useCallback((e) => {
        const selectedTab = e.currentTarget.dataset.id;
        setActiveTab(prev => prev === selectedTab ? prev : selectedTab);
    }, []);

    return (
        <section>
            <nav>
                {TABS.map((tab) => {
                    const isActive = tab === activeTab;
                    return (
                        <TabItem
                            key={tab}
                            tab={tab}
                            onTabClick={handleTabClick}
                            isActive={isActive}
                        />
                    );
                })}
            </nav>

            <main>{TAB_CONTENT[activeTab]}</main>
        </section>
    );
}
