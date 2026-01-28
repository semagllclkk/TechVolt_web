// Project types matching backend schema
export interface Project {
    id: number;
    title: string;
    description: string;
    imagePath: string;
    date: string;
    capacity: string;
    location: string;
    category: string;
    startDate: string;
    endDate: string;
    panelCount: number;
    status: string;
    benefits: string[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateProjectInput {
    title: string;
    description: string;
    imagePath: string;
    date: string;
    capacity: string;
    location: string;
    category: string;
    startDate: string;
    endDate: string;
    panelCount: number;
    status?: string;
    benefits: string[];
    isActive?: boolean;
}

export interface UpdateProjectInput {
    title?: string;
    description?: string;
    imagePath?: string;
    date?: string;
    capacity?: string;
    location?: string;
    category?: string;
    startDate?: string;
    endDate?: string;
    panelCount?: number;
    status?: string;
    benefits?: string[];
    isActive?: boolean;
}

// Contact types
export interface ContactMessage {
    name: string;
    email: string;
    phone: string;
    message: string;
}
