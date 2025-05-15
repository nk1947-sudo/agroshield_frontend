// dataService.ts
import { PRODUCT_DATABASE } from '../context/AppContext';

// Types for product database
interface ProductDetail {
  activeIngredient?: string;
  composition?: string;
  packaging: string[];
  batchFormat?: string;
  commonCounterfeitMarkers?: string[];
  hologramFeatures?: string[];
  subsidizedRate?: number;
  mrp: Record<string, number>;
  bagColor?: string;
  varieties?: string[];
}

interface CompanyProducts {
  [productName: string]: ProductDetail;
}

interface CategoryCompanies {
  [companyName: string]: CompanyProducts;
}

interface ProductDatabase {
  pesticides: CategoryCompanies;
  fertilizers: CategoryCompanies;
  seeds: CategoryCompanies;
}

// Product Database Service
const productService = {
  getAllCategories: (): string[] => {
    return Object.keys(PRODUCT_DATABASE);
  },
  
  getCompaniesByCategory: (category: keyof ProductDatabase): string[] => {
    return Object.keys(PRODUCT_DATABASE[category] || {});
  },
  
  getProductsByCompany: (category: keyof ProductDatabase, company: string): string[] => {
    return Object.keys(PRODUCT_DATABASE[category]?.[company] || {});
  },
  
  getProductDetails: (
    category: keyof ProductDatabase, 
    company: string, 
    product: string
  ): ProductDetail | null => {
    return PRODUCT_DATABASE[category]?.[company]?.[product] || null;
  },
  
  searchProducts: (query: string): Array<{
    category: string;
    company: string;
    product: string;
    details: ProductDetail;
  }> => {
    const results = [];
    const lowerQuery = query.toLowerCase();
    
    // Search through all categories, companies, and products
    for (const category in PRODUCT_DATABASE) {
      const categoryData = PRODUCT_DATABASE[category as keyof ProductDatabase];
      
      for (const company in categoryData) {
        const companyProducts = categoryData[company];
        
        for (const productName in companyProducts) {
          const productDetails = companyProducts[productName];
          
          // Check if the query matches product name, company, or active ingredient
          if (
            productName.toLowerCase().includes(lowerQuery) ||
            company.toLowerCase().includes(lowerQuery) ||
            productDetails.activeIngredient?.toLowerCase().includes(lowerQuery)
          ) {
            results.push({
              category,
              company,
              product: productName,
              details: productDetails
            });
          }
        }
      }
    }
    
    return results;
  },
  
  validateProduct: (
    category: keyof ProductDatabase,
    company: string,
    product: string,
    batchNumber: string,
    packaging: string
  ): {
    isValid: boolean;
    issues: string[];
  } => {
    const productDetails = PRODUCT_DATABASE[category]?.[company]?.[product];
    const issues = [];
    
    if (!productDetails) {
      return { isValid: false, issues: ['Product not found in database'] };
    }
    
    // Check if packaging is valid
    if (!productDetails.packaging.includes(packaging)) {
      issues.push(`Invalid packaging size. Expected: ${productDetails.packaging.join(', ')}`);
    }
    
    // Check batch number format if available
    if (productDetails.batchFormat) {
      // Simple format validation (this would be more sophisticated in a real implementation)
      const formatRegex = productDetails.batchFormat
        .replace('YYYYMM', '\\d{6}')
        .replace('XXXXX', '\\d{5}');
      
      const regex = new RegExp(`^${formatRegex}$`);
      if (!regex.test(batchNumber)) {
        issues.push(`Invalid batch number format. Expected: ${productDetails.batchFormat}`);
      }
    }
    
    return {
      isValid: issues.length === 0,
      issues
    };
  }
};

// Location and jurisdiction service
const locationService = {
  getDistricts: async (): Promise<string[]> => {
    // Mock data - in a real app, this would come from an API
    return [
      'Ahmednagar', 'Kolhapur', 'Mumbai City', 'Nagpur', 
      'Pune', 'Sangli', 'Satara', 'Solapur', 'Thane'
    ];
  },
  
  getSubDivisions: async (district: string): Promise<string[]> => {
    // Mock subdivision data
    const subdivisions: Record<string, string[]> = {
      'Kolhapur': ['Karvir', 'Hatkangle', 'Panhala', 'Shahuwadi', 'Gadhinglaj'],
      'Sangli': ['Miraj', 'Tasgaon', 'Khanapur', 'Shirala', 'Walwa'],
      'Pune': ['Haveli', 'Mulshi', 'Maval', 'Bhor', 'Velhe', 'Junnar'],
      'Solapur': ['North Solapur', 'South Solapur', 'Pandharpur', 'Malshiras', 'Mangalvedhe'],
      'Ahmednagar': ['Nagar', 'Shrirampur', 'Shevgaon', 'Pathardi', 'Rahuri', 'Parner']
    };
    
    return subdivisions[district] || [];
  },
  
  getRetailers: async (district: string, subdivision?: string): Promise<Array<{
    id: string;
    name: string;
    licenseNumber: string;
    address: string;
    contactPerson: string;
    phone: string;
    riskScore: number;
  }>> => {
    // This would be an API call in a real implementation
    // Returning mock data for demonstration
    return [
      {
        id: 'RET001',
        name: 'Krishi Kendra',
        licenseNumber: 'AG-RET-2022-1234',
        address: '123 Farm Road, Kolhapur',
        contactPerson: 'Ramesh Patil',
        phone: '9876543210',
        riskScore: 25
      },
      {
        id: 'RET002',
        name: 'Farmers Supply Center',
        licenseNumber: 'AG-RET-2021-5678',
        address: '456 Market Street, Sangli',
        contactPerson: 'Sunil Joshi',
        phone: '9876543211',
        riskScore: 65
      },
      {
        id: 'RET003',
        name: 'Agro Solutions',
        licenseNumber: 'AG-RET-2023-9012',
        address: '789 Main Road, Pune',
        contactPerson: 'Priya Sharma',
        phone: '9876543212',
        riskScore: 35
      }
    ];
  },
  
  getDistributors: async (district: string): Promise<Array<{
    id: string;
    name: string;
    licenseNumber: string;
    address: string;
    contactPerson: string;
    phone: string;
    companies: string[];
  }>> => {
    // Mock distributor data
    return [
      {
        id: 'DIST001',
        name: 'Maharashtra Agro Distributors',
        licenseNumber: 'AG-DIST-2022-4321',
        address: '789 Industrial Area, Kolhapur',
        contactPerson: 'Vijay Deshmukh',
        phone: '9876543220',
        companies: ['UPL', 'Syngenta', 'Bayer']
      },
      {
        id: 'DIST002',
        name: 'Farm Supply Network',
        licenseNumber: 'AG-DIST-2021-8765',
        address: '456 Distribution Center, Sangli',
        contactPerson: 'Anil Kulkarni',
        phone: '9876543221',
        companies: ['UPL', 'IFFCO', 'Coromandel']
      }
    ];
  },
  
  // Get high-risk areas
  getHighRiskAreas: async (): Promise<Array<{
    area: string;
    district: string;
    riskLevel: number;
    violations: number;
    lastInspection: string;
  }>> => {
    // Mock data
    return [
      {
        area: 'Kolhapur',
        district: 'Kolhapur',
        riskLevel: 85,
        violations: 22,
        lastInspection: '2023-04-15'
      },
      {
        area: 'Sangli',
        district: 'Sangli',
        riskLevel: 72,
        violations: 18,
        lastInspection: '2023-05-02'
      },
      {
        area: 'Solapur',
        district: 'Solapur',
        riskLevel: 68,
        violations: 15,
        lastInspection: '2023-04-20'
      },
      {
        area: 'Ahmednagar',
        district: 'Ahmednagar',
        riskLevel: 78,
        violations: 20,
        lastInspection: '2023-03-28'
      },
      {
        area: 'Pune',
        district: 'Pune',
        riskLevel: 65,
        violations: 12,
        lastInspection: '2023-05-10'
      }
    ];
  }
};

// Export services
export default {
  product: productService,
  location: locationService
};