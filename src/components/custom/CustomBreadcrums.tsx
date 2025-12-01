import { SlashIcon } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../ui/breadcrumb"
import { Link } from "react-router";

interface Breadcrumb {
    label: string;
    to: string;
}

interface Props {
    currentPage: string;
    breadcrumbs?: Breadcrumb[];
}

export const CustomBreadcrums = ( { currentPage, breadcrumbs }:Props ) => {
  return (
    <Breadcrumb className="my-5">
        <BreadcrumbList>
            <BreadcrumbItem>
                <BreadcrumbLink asChild>
                    <Link to='/'>Inicio</Link>
                </BreadcrumbLink>
            </BreadcrumbItem>

                { breadcrumbs?.map((crumb) => (
                    <BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <SlashIcon />
                    </BreadcrumbSeparator>
                        <BreadcrumbLink asChild>
                            <Link to={ crumb.to }>{ crumb.label }</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                ))}
                
            <BreadcrumbSeparator>
                <SlashIcon />
            </BreadcrumbSeparator>

            <BreadcrumbItem>
                <BreadcrumbLink className="text-black">{ currentPage }</BreadcrumbLink>
            </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>
  )
}
