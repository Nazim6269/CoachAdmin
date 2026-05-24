import { apiClient } from "@/lib/api/client";
import { CreateSubscriptionPayload, SubscriptionPlan, UpdateSubscriptionPayload } from "@/types/subscription/types";
import toast from "react-hot-toast";

// Use localStorage to track "deleted" or "archived" plans
const ARCHIVED_PLANS_KEY = 'subscription_archived_plans';

export const subscriptionService = {

    async getPlans(): Promise<SubscriptionPlan[]> {
        try {
            const response = await apiClient.get<{ 
                success: boolean;
                statusCode: number;
                message: string;
                data: SubscriptionPlan[] 
            }>('/subscriptions/plans');
            
            // Filter out archived plans client-side
            const archivedIds = this.getArchivedPlans();
            const activePlans = response.data.filter(plan => !archivedIds.includes(plan.id));
            
            return activePlans;
        } catch (error) {
            console.error('Error fetching plans:', error);
            throw error;
        }
    },

    // Get ALL plans including archived (for internal use)
    async getAllPlansIncludingArchived(): Promise<SubscriptionPlan[]> {
        try {
            const response = await apiClient.get<{ 
                success: boolean;
                statusCode: number;
                message: string;
                data: SubscriptionPlan[] 
            }>('/subscriptions/plans');
            
            return response.data;
        } catch (error) {
            console.error('Error fetching plans:', error);
            throw error;
        }
    },

    // Helper to get archived plan IDs from localStorage
    getArchivedPlans(): string[] {
        try {
            return JSON.parse(localStorage.getItem(ARCHIVED_PLANS_KEY) || '[]');
        } catch {
            return [];
        }
    },

    // Helper to save archived plan IDs
    saveArchivedPlans(ids: string[]): void {
        localStorage.setItem(ARCHIVED_PLANS_KEY, JSON.stringify(ids));
    },

    async getPlanById(id: string): Promise<SubscriptionPlan> {
        try {
            // Since single plan endpoint doesn't work, get from all plans
            const allPlans = await this.getAllPlansIncludingArchived();
            const plan = allPlans.find(p => p.id === id);
            
            if (!plan) {
                throw new Error(`Plan with id ${id} not found`);
            }
            
            return plan;
        } catch (error) {
            console.error(`Error fetching plan ${id}:`, error);
            throw error;
        }
    },

    async createPlan(payload: CreateSubscriptionPayload): Promise<SubscriptionPlan> {
        try {
            const response = await apiClient.post<{ 
                success: boolean;
                statusCode: number;
                message: string;
                data: SubscriptionPlan 
            }>('/admin/subscription-plans', payload);
            
            return response.data;
        } catch (error) {
            console.error('Error creating plan:', error);
            throw error;
        }
    },

    async updatePlan(id: string, payload: UpdateSubscriptionPayload): Promise<SubscriptionPlan> {
        try {
            // Get the original plan to preserve required fields
            const originalPlan = await this.getPlanById(id);
            
            // Create a new plan with updated data (only using fields from UpdateSubscriptionPayload)
            const createPayload: CreateSubscriptionPayload = {
                name: payload.name || originalPlan.name,
                price: payload.price || originalPlan.price,
                currency: originalPlan.currency,
                interval: originalPlan.interval,
                features: payload.features || originalPlan.features,
                description: originalPlan.description, // Keep original description
                is_active: payload.is_active !== undefined ? payload.is_active : originalPlan.is_active === 1,
                kind: payload.kind || originalPlan.kind,
            };
            
            const newPlan = await this.createPlan(createPayload);
            
            // Archive the old plan (client-side only)
            const archivedIds = this.getArchivedPlans();
            if (!archivedIds.includes(id)) {
                archivedIds.push(id);
                this.saveArchivedPlans(archivedIds);
            }
            
            toast.success(`Plan updated! New version created`);
            
            return newPlan;
        } catch (error) {
            console.error(`Error updating plan ${id}:`, error);
            throw error;
        }
    },

    // Client-side delete (just archive it)
    async deletePlan(id: string): Promise<void> {
        try {
            const archivedIds = this.getArchivedPlans();
            if (!archivedIds.includes(id)) {
                archivedIds.push(id);
                this.saveArchivedPlans(archivedIds);
                toast.success("Plan archived successfully");
            }
        } catch (error) {
            console.error(`Error archiving plan ${id}:`, error);
            toast.error("Failed to archive plan");
            throw error;
        }
    },

    // Restore an archived plan
    async restorePlan(id: string): Promise<void> {
        try {
            const archivedIds = this.getArchivedPlans();
            const updatedArchived = archivedIds.filter(archivedId => archivedId !== id);
            this.saveArchivedPlans(updatedArchived);
            toast.success("Plan restored successfully");
        } catch (error) {
            console.error(`Error restoring plan ${id}:`, error);
            throw error;
        }
    }
};