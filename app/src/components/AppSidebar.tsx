import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  MessageCircle, 
  FileText, 
  Settings, 
  Bot,
  Home,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

const menuItems = [
  { 
    title: 'Chat', 
    url: '/', 
    icon: MessageCircle,
    description: 'AI Assistant Chat'
  },
  { 
    title: 'Documents', 
    url: '/documents', 
    icon: FileText,
    description: 'Manage Documents'
  },
  { 
    title: 'Settings', 
    url: '/settings', 
    icon: Settings,
    description: 'App Settings'
  },
];

export function AppSidebar() {
  const { state, isMobile } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === 'collapsed';

  

  return (
    <Sidebar 
      className={cn(
        "transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
      collapsible="icon"
    >
      {/* Header */}
      <div className={cn(
        "p-4 border-b border-sidebar-border",
        isCollapsed && "px-2"
      )}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center flex-shrink-0">
            <Bot className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div className="animate-fade-in">
              <h2 className="font-bold text-lg text-sidebar-foreground">
                RAG AI
              </h2>
              <p className="text-xs text-sidebar-foreground/70">Assistant</p>
            </div>
          )}
        </div>
      </div>

      <SidebarContent className={cn("p-2", isCollapsed && "px-1")}>
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-sidebar-foreground/70 px-2 py-2">
              Navigation
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className={cn("space-y-1", isCollapsed && "space-y-2")}>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="group">
                    <NavLink 
                      to={item.url} 
                      end
                      className={({ isActive }) => cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-sidebar-accent",
                        isActive 
                          ? "bg-sidebar-accent text-sidebar-accent-foreground border border-sidebar-border" 
                          : "text-sidebar-foreground/70 hover:text-sidebar-foreground",
                        isCollapsed && "px-2 py-3 justify-center"
                      )}
                    >
                      {({ isActive }) => (
                        <>
                          <item.icon className={cn(
                            "flex-shrink-0 transition-colors",
                            isCollapsed ? "w-6 h-6" : "w-5 h-5",
                            isActive && "text-sidebar-accent-foreground"
                          )} />
                          {!isCollapsed && (
                            <div className="animate-fade-in">
                              <span className="font-medium">{item.title}</span>
                              <p className="text-xs text-sidebar-foreground/50">{item.description}</p>
                            </div>
                          )}
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Status Section */}
        <div className={cn("mt-auto p-2", isCollapsed && "p-1")}>
          {!isCollapsed ? (
            <div className="bg-sidebar-accent rounded-lg p-3 animate-fade-in">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-sidebar-accent-foreground">Connected</span>
              </div>
              <p className="text-xs text-sidebar-accent-foreground/70">
                RAG system ready
              </p>
            </div>
          ) : (
            <div className="flex justify-center py-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          )}
        </div>
      </SidebarContent>

      {/* Toggle Button */}
      <div className="absolute -right-3 top-6 z-10">
        <SidebarTrigger className="w-6 h-6 bg-sidebar-background border-sidebar-border hover:bg-sidebar-accent rounded-md border">
          {isCollapsed ? (
            <ChevronRight className="w-3 h-3" />
          ) : (
            <ChevronLeft className="w-3 h-3" />
          )}
        </SidebarTrigger>
      </div>
    </Sidebar>
  );
}