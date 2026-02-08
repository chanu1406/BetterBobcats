"use client";

import { useCallback, useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type {
  ClubsBrowseFilters,
  ClubProfileRecruitingStatus,
  ClubProfileCommitmentLevel,
  ClubProfileOpenTo,
} from "@/lib/clubs";

const PARAM_MAJOR = "major";
const PARAM_SEARCH = "q";
const PARAM_RECRUITING = "recruiting";
const PARAM_COMMITMENT = "commitment";
const PARAM_OPEN_TO = "openTo";
const PARAM_OPEN_TO_ALL_MAJORS = "openToAllMajors";
const PARAM_NO_DUES = "noDues";
const PARAM_SORT = "sort";

function parseBool(value: string | null): boolean | null {
  if (value === null || value === "") return null;
  if (value === "true" || value === "1") return true;
  if (value === "false" || value === "0") return false;
  return null;
}

export function useClubFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters: ClubsBrowseFilters = useMemo(() => {
    const major = searchParams.get(PARAM_MAJOR);
    const search = searchParams.get(PARAM_SEARCH);
    const recruiting = searchParams.get(PARAM_RECRUITING) as ClubProfileRecruitingStatus | null;
    const commitment = searchParams.get(PARAM_COMMITMENT) as ClubProfileCommitmentLevel | null;
    const openTo = searchParams.get(PARAM_OPEN_TO) as ClubProfileOpenTo | null;
    const openToAllMajors = parseBool(searchParams.get(PARAM_OPEN_TO_ALL_MAJORS));
    const noDues = parseBool(searchParams.get(PARAM_NO_DUES));
    const sort = searchParams.get(PARAM_SORT) as ClubsBrowseFilters["sortBy"] | null;

    const validRecruiting: ClubProfileRecruitingStatus[] = ["open", "closed", "by_invite"];
    const validCommitment: ClubProfileCommitmentLevel[] = ["casual", "moderate", "high"];
    const validOpenTo: ClubProfileOpenTo[] = ["undergrad", "grad", "both"];
    const validSort: ClubsBrowseFilters["sortBy"][] = [
      "relevant",
      "updated",
      "alphabetical",
      "recruiting",
    ];

    return {
      majorId: major || null,
      search: search || null,
      recruitingStatus:
        recruiting && validRecruiting.includes(recruiting) ? recruiting : null,
      commitmentLevel:
        commitment && validCommitment.includes(commitment) ? commitment : null,
      openTo: openTo && validOpenTo.includes(openTo) ? openTo : null,
      openToAllMajors: openToAllMajors ?? null,
      noDues: noDues ?? null,
      sortBy: sort && validSort.includes(sort) ? sort : "relevant",
    };
  }, [searchParams]);

  const setFilter = useCallback(
    (key: keyof ClubsBrowseFilters, value: string | boolean | null | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      const stringValue =
        typeof value === "boolean" ? (value ? "true" : "false") : value;

      const paramKey =
        key === "majorId"
          ? PARAM_MAJOR
          : key === "search"
            ? PARAM_SEARCH
            : key === "recruitingStatus"
              ? PARAM_RECRUITING
              : key === "commitmentLevel"
                ? PARAM_COMMITMENT
                : key === "openTo"
                  ? PARAM_OPEN_TO
                  : key === "openToAllMajors"
                    ? PARAM_OPEN_TO_ALL_MAJORS
                    : key === "noDues"
                      ? PARAM_NO_DUES
                      : key === "sortBy"
                        ? PARAM_SORT
                        : null;

      if (paramKey) {
        if (stringValue === null || stringValue === undefined || stringValue === "") {
          params.delete(paramKey);
        } else {
          params.set(paramKey, stringValue);
        }
      }

      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname);
    },
    [pathname, router, searchParams]
  );

  const clearFilters = useCallback(() => {
    router.push(pathname);
  }, [pathname, router]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.majorId) count++;
    if (filters.search) count++;
    if (filters.recruitingStatus) count++;
    if (filters.commitmentLevel) count++;
    if (filters.openTo) count++;
    if (filters.openToAllMajors === true) count++;
    if (filters.noDues === true) count++;
    if (filters.sortBy && filters.sortBy !== "relevant") count++;
    return count;
  }, [filters]);

  return { filters, setFilter, clearFilters, activeFilterCount };
}
